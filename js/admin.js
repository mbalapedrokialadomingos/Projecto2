// Script da página de login do administrador.
// Faz o envio das credenciais para o backend e redireciona para o painel.
const formLogin = document.getElementById("formLogin");

const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    // Captura os valores inseridos no formulário de autenticação administrativa.
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {

        // Envia a autenticação ao servidor para validar o utilizador admin.
        const resposta = await fetch("/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuario: usuario,
                senha: senha
            })
        });

        const dados = await resposta.json();

        // Mostra a resposta do servidor ao utilizador.
        mensagemLogin.textContent = dados.mensagem;

        if (resposta.ok) {
            // Caso o login seja bem-sucedido, entra no painel administrativo.
            window.location.href = "/painel.html";
        }

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemLogin.textContent =
            "Não foi possível conectar ao servidor.";
    }
});