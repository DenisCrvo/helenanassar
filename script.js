// Aguarda o documento HTML ser completamente carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário e de status no HTML.
    const form = document.getElementById('form-presenca');
    const statusMessage = document.getElementById('mensagem-status');

    // Adiciona um "ouvinte" para o evento de envio (submit) do formulário.
    form.addEventListener('submit', e => {
        // 1. Previne o comportamento padrão do formulário, que é recarregar a página.
        e.preventDefault();

        // 2. Mostra uma mensagem de "Enviando..." para o usuário.
        statusMessage.textContent = 'Enviando sua confirmação...';
        statusMessage.style.color = '#333'; // Cor neutra

        // 3. Coleta os dados do formulário usando a API FormData.
        const data = new FormData(form);

        // 4. Envia os dados para a URL do seu Google Apps Script.
        //    !!! IMPORTANTE: Substitua a URL abaixo pela URL que você copiou !!!
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzkjkxtkVwPU5UQ11cmiZqGxXBY6WfYSMmhscIZQ6uT3sI_1GKMtWVnbRLcqm8E-u3C/exec';

        fetch(scriptURL, {
            method: 'POST',
            body: data
        })
        .then(response => response.json()) // Converte a resposta para JSON.
        .then(data => {
            // 5. Se o envio foi bem-sucedido (o script retornou 'success').
            if (data.result === 'success') {
                statusMessage.textContent = 'Confirmação enviada com sucesso! Obrigado!';
                statusMessage.style.color = 'green'; // Cor de sucesso
                form.reset(); // Limpa os campos do formulário.
            } else {
                // Se houve um erro no script (mas a comunicação funcionou).
                throw new Error('Ocorreu um erro ao salvar os dados.');
            }
        })
        .catch(error => {
            // 6. Se ocorreu um erro de rede ou qualquer outra falha na comunicação.
            console.error('Erro!', error.message);
            statusMessage.textContent = 'Ocorreu um erro ao enviar. Tente novamente.';
            statusMessage.style.color = 'red'; // Cor de erro
        });
    });

    // O código abaixo é para exibir o formulário quando o usuário decide confirmar.
    // Você mencionou que o formulário começa oculto.
    // Vamos supor que você tenha um botão para mostrá-lo.
    // Se não tiver, podemos adaptar. Por enquanto, vou criar um botão de exemplo.

    // Crie um botão CTA no seu HTML se ainda não tiver:
    // <button id="show-form-btn" class="cta-button">Confirmar Presença</button>
    // Coloque este botão na seção <section class="section-rsvp">

    const showFormButton = document.getElementById('show-form-btn'); // Supondo que você crie este botão
    const formArea = document.getElementById('form-area');

    if (showFormButton) {
        showFormButton.addEventListener('click', () => {
            formArea.style.display = 'block'; // Mostra o formulário
            showFormButton.style.display = 'none'; // Esconde o botão "Confirmar Presença"
        });
    } else {
        // Se não houver botão, apenas garanta que a área do formulário seja exibida.
        // O seu HTML já tem `style="display: none;"`, então um botão é necessário.
        console.warn('Botão para mostrar o formulário não encontrado. O formulário permanecerá oculto.');
    }
});
