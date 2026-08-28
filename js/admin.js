const formLogin = document.getElementById("formLogin");

const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const usuario = document.getElementById("usuario").value;

    const senha = document.getElementById("senha").value;

    try {

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

        mensagemLogin.textContent = dados.mensagem;

if (resposta.ok) {
    window.location.href = "/painel.html";
}

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemLogin.textContent =
            "Não foi possível conectar ao servidor.";
    }
});