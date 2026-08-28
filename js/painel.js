const listaInscricoes = document.getElementById("listaInscricoes");

async function carregarInscricoes() {

    try {

        const resposta = await fetch("/inscricoes");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as inscrições.");
        }

        const inscricoes = await resposta.json();

        listaInscricoes.innerHTML = "";

        inscricoes.forEach((inscricao) => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${inscricao.id}</td>
                <td>${inscricao.nome}</td>
                <td>${inscricao.email}</td>
                <td>${inscricao.formacao}</td>
                <td>${inscricao.data_inscricao}</td>
            `;

            listaInscricoes.appendChild(linha);
        });

    } catch (erro) {

        console.error("Erro:", erro);

        listaInscricoes.innerHTML = `
            <tr>
                <td colspan="5">
                    Não foi possível carregar as inscrições.
                </td>
            </tr>
        `;
    }
}

carregarInscricoes();

const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", async () => {

    try {

        const resposta = await fetch("/logout", {
            method: "POST"
        });

        if (resposta.ok) {
            window.location.href = "/admin.html";
        }

    } catch (erro) {

        console.error("Erro ao sair:", erro);

    }
});

const formFormacao = document.getElementById("formFormacao");

const mensagemFormacao =
    document.getElementById("mensagemFormacao");

formFormacao.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome =
        document.getElementById("nomeFormacao").value;

    const descricao =
        document.getElementById("descricaoFormacao").value;

    const modalidade =
        document.getElementById("modalidadeFormacao").value;

    const preco =
        document.getElementById("precoFormacao").value;

    try {

        const resposta = await fetch("/formacoes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                descricao: descricao,
                modalidade: modalidade,
                preco: preco
            })
        });

        const dados = await resposta.json();

        mensagemFormacao.textContent = dados.mensagem;

        if (resposta.ok) {
            formFormacao.reset();
        }

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemFormacao.textContent =
            "Erro ao adicionar formação.";
    }
});