document.addEventListener('DOMContentLoaded', () => {
    const rsvpButton = document.getElementById('rsvp-btn');
    const rsvpFormArea = document.getElementById('form-area');
    const rsvpForm = document.getElementById('rsvp-form-submission');
    const formMessage = document.getElementById('form-message');

    // 1. Mostrar/Esconder o Formulário de RSVP ao clicar no botão CTA
    rsvpButton.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão (ex: link)

        // Alterna a visibilidade do formulário
        if (rsvpFormArea.style.display === 'none' || rsvpFormArea.style.display === '') {
            rsvpFormArea.style.display = 'block';
            rsvpButton.textContent = 'Obrigado(a)! Agora preencha os dados abaixo.';
            rsvpButton.classList.add('cta-hidden'); // Adiciona classe para desativar/esconder o botão após clique
            
            // Rola a tela para o formulário
            rsvpFormArea.scrollIntoView({ behavior: 'smooth' });

        } else {
            // Se já estiver aberto, apenas rola para a visualização
            rsvpFormArea.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // 2. Simular o Envio do Formulário (No mundo real, você usaria Fetch API para enviar a um servidor ou Google Forms)
    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Coleta dados (apenas para exibição na simulação)
        const name = rsvpForm.querySelector('input[name="name"]').value;
        const adults = rsvpForm.querySelector('input[name="adults"]').value;
        const kids = rsvpForm.querySelector('input[name="kids"]').value;

        // Limpa os campos após a "simulação de envio"
        rsvpForm.reset();

        // Exibe mensagem de sucesso
        formMessage.textContent = `Confirmação de ${adults} adulto(s) e ${kids} criança(s) enviada com sucesso para ${name}! Um abraço!`;
        
        // Esconde o formulário após 5 segundos e reseta o botão
        setTimeout(() => {
            rsvpFormArea.style.display = 'none';
            formMessage.textContent = '';
            rsvpButton.textContent = '👉 VOU ESCALAR ESTA MONTANHA PARA CELEBRAR! 👈'; // Texto original do CTA
            rsvpButton.classList.remove('cta-hidden');
        }, 5000);
    });
});