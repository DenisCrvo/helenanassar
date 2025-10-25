document.addEventListener('DOMContentLoaded', () => {
    // URL de Implantação do Google Apps Script (Backend)
    const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8oX2gPEZk8Z0qdVZPtozFT011ktpacpEKZiBhWE_yUEWI6bSI2KHIy26g3z8CqiD7kA/exec';

    // Elementos da Interface
    // NOTA: Ajustei o seletor para rsvp-btn, que não estava no HTML anterior, 
    // mas assumi que é o botão que abre o formulário.
    const rsvpButton = document.getElementById('rsvp-btn'); 
    const rsvpFormArea = document.getElementById('form-area');
    const rsvpForm = document.getElementById('rsvp-form-submission');
    const formMessage = document.getElementById('form-message');

    // Estado inicial do formulário (escondido)
    if (rsvpFormArea) {
        rsvpFormArea.style.display = 'none';
    }


    // 1. Mostrar/Esconder o Formulário de RSVP ao clicar no botão CTA
    if (rsvpButton && rsvpFormArea) {
        rsvpButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (rsvpFormArea.style.display === 'none' || rsvpFormArea.style.display === '') {
                rsvpFormArea.style.display = 'block';
                
                // Mude o texto do botão para indicar que a ação foi realizada ou
                // Adicione a classe para escondê-lo/desativá-lo
                rsvpButton.textContent = 'Obrigado(a)! Agora preencha os dados abaixo.';
                rsvpButton.classList.add('cta-hidden'); 
                
                // Rola a tela para o formulário
                rsvpFormArea.scrollIntoView({ behavior: 'smooth' });

            } else {
                rsvpFormArea.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. Envio REAL do Formulário para o Google Sheets
    if (rsvpForm && formMessage) {
        rsvpForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // 1. Prepara os dados
            const formData = new FormData(rsvpForm);
            // Converte para URLSearchParams, que o Google Apps Script espera no POST
            const data = new URLSearchParams(formData);

            // 2. Feedback visual inicial
            formMessage.style.color = '#797b77'; // Cor de carregamento
            formMessage.textContent = 'Enviando sua confirmação... Por favor, aguarde.';
            
            // Desativa o botão de envio para evitar cliques duplos
            const submitButton = rsvpForm.querySelector('.submit-button');
            submitButton.disabled = true;

            try {
                // 3. Envio da Requisição
                const response = await fetch(GOOGLE_APP_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Necessário para evitar erros de CORS no GitHub Pages
                    body: data, 
                });

                // 4. Sucesso na comunicação (como usamos 'no-cors', não verificamos response.ok)
                
                // Coleta dados para a mensagem de sucesso personalizada (apenas do JS)
                const name = formData.get('name');
                const adults = formData.get('adults');
                const kids = formData.get('kids');

                formMessage.style.color = 'green';
                formMessage.textContent = `Confirmação de ${adults} adulto(s) e ${kids} criança(s) enviada com sucesso para ${name}! Um abraço!`;
                
                rsvpForm.reset(); // Limpa o formulário

                // 5. Esconde o formulário após 5 segundos e reseta o botão CTA
                setTimeout(() => {
                    if (rsvpFormArea) rsvpFormArea.style.display = 'none';
                    formMessage.textContent = '';
                    if (rsvpButton) {
                        // Texto original do CTA (ajuste para o seu texto real)
                        rsvpButton.textContent = '👉 VOU ESCALAR ESTA MONTANHA PARA CELEBRAR! 👈'; 
                        rsvpButton.classList.remove('cta-hidden');
                    }
                }, 5000);

            } catch (error) {
                // 6. Trata Erros de Rede ou Script (Raramente ocorre com no-cors, mas é bom ter)
                console.error('Erro de envio:', error);
                formMessage.style.color = 'red';
                formMessage.textContent = 'Falha ao enviar a confirmação. Por favor, verifique sua conexão e tente novamente.';
            } finally {
                // 7. Reativa o botão de envio
                submitButton.disabled = false;
            }
        });
    }
});