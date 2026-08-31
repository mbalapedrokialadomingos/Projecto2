const nomeAluno = document.getElementById("nomeAluno");
const listaMinhasInscricoes = document.getElementById("listaMinhasInscricoes");
const btnLogoutAluno = document.getElementById("btnLogoutAluno");

async function carregarPerfilAluno() {
    try {
        const resposta = await fetch("/perfil");

        if (!resposta.ok) {
            window.location.href = "/";
            return;
        }

        const dados = await resposta.json();

        if (!dados.autenticado) {
            window.location.href = "/";
            return;
        }

        nomeAluno.textContent = dados.utilizador.nome;
        carregarInscricoesAluno();
    } catch (erro) {
        console.error("Erro ao carregar perfil do aluno:", erro);
        window.location.href = "/";
    }
}

async function carregarInscricoesAluno() {
    try {
        const resposta = await fetch("/minhas-inscricoes");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as inscrições.");
        }

        const dados = await resposta.json();

        if (!dados.inscricoes || dados.inscricoes.length === 0) {
            listaMinhasInscricoes.innerHTML = "<p class='empty-state'>Ainda não tens formações inscritas.</p>";
            return;
        }

        listaMinhasInscricoes.innerHTML = "";

        dados.inscricoes.forEach((inscricao) => {
            const item = document.createElement("article");
            item.classList.add("aluno-item");

            item.innerHTML = `
                <div>
                    <h3>${inscricao.formacao}</h3>
                    <p>Estado: <strong>${inscricao.estado}</strong></p>
                    <p>Pagamento: <strong>${inscricao.estado_pagamento}</strong></p>
                    <p>Data: ${new Date(inscricao.data_inscricao).toLocaleDateString("pt-PT")}</p>
                </div>
            `;

            listaMinhasInscricoes.appendChild(item);
        });
    } catch (erro) {
        console.error("Erro ao carregar inscrições do aluno:", erro);
        listaMinhasInscricoes.innerHTML = "<p class='empty-state'>Não foi possível carregar as suas inscrições.</p>";
    }
}

btnLogoutAluno.addEventListener("click", async () => {
    try {
        await fetch("/logout", { method: "POST" });
        window.location.href = "/";
    } catch (erro) {
        console.error("Erro ao sair:", erro);
    }
});

carregarPerfilAluno();
