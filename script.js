// --- CÓDIGO PARA O FORMULÁRIO ---

// 1. Cole aqui a URL do seu aplicativo da web do Google Apps Script.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXR13dWG_A4OJt4aO4s0wOpHGzNG8TODbxJrRALhWDO3jChxcuqXGR3uGwAuwDJGkIZA/exec';

// 2. Pega os elementos do HTML que vamos usar.
const form = document.getElementById('form-presenca');
const statusMessage = document.getElementById('mensagem-status');
const submitButton = form.querySelector('.submit-button');

// 3. Adiciona um "ouvinte" para quando o formulário for enviado.
form.addEventListener('submit', e => {
    e.preventDefault(); // Impede que a página recarregue.

    // Mostra uma mensagem de "enviando" e desabilita o botão para evitar cliques duplos.
    statusMessage.textContent = "Enviando sua confirmação...";
    statusMessage.style.color = "#333"; // Cor neutra para a mensagem de envio
    submitButton.disabled = true;

    // 4. Envia os dados do formulário para o Google Sheets.
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            // Se deu certo, mostra uma mensagem de sucesso.
            statusMessage.textContent = "Obrigado! Sua presença foi confirmada com sucesso! 🎶";
            statusMessage.style.color = "green";
            form.reset(); // Limpa os campos do formulário.
        } else {
            // Se o script retornou um erro, mostra o erro.
            throw new Error(data.error || 'Ocorreu um erro desconhecido.');
        }
    })
    .catch(error => {
        // Se ocorreu um erro de rede ou outro problema, mostra uma mensagem de erro.
        statusMessage.textContent = "Oops! Algo deu errado. Por favor, tente novamente.";
        statusMessage.style.color = "red";
        console.error('Erro ao enviar:', error.message);
    })
    .finally(() => {
        // Reabilita o botão de envio, independentemente do resultado.
        submitButton.disabled = false;
    });
});


// --- CÓDIGO PARA MOSTRAR/ESCONDER O FORMULÁRIO ---

const rsvpBtn = document.getElementById('rsvp-btn');
const formArea = document.getElementById('form-area');

rsvpBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o link de pular para a âncora #form-area
    
    // Mostra a área do formulário com um efeito suave
    if (formArea.style.display === 'none') {
        formArea.style.opacity = 0;
        formArea.style.display = 'block';
        setTimeout(() => {
            formArea.style.transition = 'opacity 0.5s ease-in-out';
            formArea.style.opacity = 1;
        }, 10);
        
        // Esconde o botão principal
        rsvpBtn.style.display = 'none';
    }
});
