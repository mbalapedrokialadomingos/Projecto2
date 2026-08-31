// Script do painel administrativo.
// Responsável pela gestão das formações, edição e aprovação das inscrições.
const listaInscricoes = document.getElementById("listaInscricoes");
const listaFormacoesAdmin = document.getElementById("listaFormacoesAdmin");
const pesquisaFormacoes = document.getElementById("pesquisaFormacoes");
const mensagemListaFormacoes = document.getElementById("mensagemListaFormacoes");
const tituloFormacao = document.getElementById("tituloFormacao");
const btnGuardarFormacao = document.getElementById("btnGuardarFormacao");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
const contadorInscricoes = document.getElementById("contadorInscricoes");

let formacoesAdmin = [];
let formacaoEmEdicao = null;

// Escapa conteúdo HTML para evitar a injeção de tags no texto exibido.
function escaparHtml(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// Limpa o formulário para o modo de criação de nova formação.
function limparFormularioFormacao() {
    formFormacao.reset();
    formacaoEmEdicao = null;
    tituloFormacao.textContent = "Adicionar Formação";
    btnGuardarFormacao.textContent = "Adicionar Formação";
    btnCancelarEdicao.hidden = true;
}

// Preenche o formulário com os dados da formação escolhida para edição.
function iniciarEdicao(formacao) {
    formacaoEmEdicao = formacao.id;
    document.getElementById("nomeFormacao").value = formacao.nome;
    document.getElementById("descricaoFormacao").value = formacao.descricao;
    document.getElementById("modalidadeFormacao").value = formacao.modalidade;
    document.getElementById("precoFormacao").value = formacao.preco;
    tituloFormacao.textContent = "Atualizar Formação";
    btnGuardarFormacao.textContent = "Guardar alterações";
    btnCancelarEdicao.hidden = false;
    document.getElementById("formFormacao").scrollIntoView({ behavior: "smooth", block: "start" });
}

// Renderiza a lista de formações com filtro por pesquisa.
function renderizarFormacoesAdmin() {
    const termo = pesquisaFormacoes.value.trim().toLowerCase();
    const formacoesFiltradas = formacoesAdmin.filter((formacao) =>
        formacao.nome.toLowerCase().includes(termo) ||
        formacao.modalidade.toLowerCase().includes(termo)
    );

    if (formacoesFiltradas.length === 0) {
        listaFormacoesAdmin.innerHTML = "<p class='empty-state'>Nenhuma formação encontrada.</p>";
        return;
    }

    listaFormacoesAdmin.innerHTML = formacoesFiltradas.map((formacao) => `
        <article class="formacao-admin-item">
            <div class="formacao-admin-conteudo">
                <div class="formacao-admin-titulo">
                    <h3>${escaparHtml(formacao.nome)}</h3>
                    <span class="badge">${escaparHtml(formacao.modalidade)}</span>
                </div>
                <p>${escaparHtml(formacao.descricao)}</p>
                <strong>${escaparHtml(formacao.preco)} Kz</strong>
            </div>
            <div class="formacao-admin-acoes">
                <button class="btn btn-ghost btn-small btn-editar-formacao" data-id="${formacao.id}" type="button">Editar</button>
                <button class="btn btn-danger btn-small btn-remover-formacao" data-id="${formacao.id}" type="button">Remover</button>
            </div>
        </article>
    `).join("");

    listaFormacoesAdmin.querySelectorAll(".btn-editar-formacao").forEach((botao) => {
        botao.addEventListener("click", () => {
            const formacao = formacoesAdmin.find((item) => item.id === Number(botao.dataset.id));
            iniciarEdicao(formacao);
        });
    });

    listaFormacoesAdmin.querySelectorAll(".btn-remover-formacao").forEach((botao) => {
        botao.addEventListener("click", () => removerFormacao(Number(botao.dataset.id)));
    });
}

// Atualiza o estado de uma inscrição usando o seletor do painel.
async function atualizarEstadoInscricao(id, estado, seletor) {
    seletor.disabled = true;

    try {
        const resposta = await fetch(`/inscricoes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Não foi possível atualizar o estado.");
        }

        seletor.dataset.estadoAnterior = estado;
        mensagemFormacao.textContent = dados.mensagem;
    } catch (erro) {
        console.error("Erro ao atualizar estado:", erro);
        seletor.value = seletor.dataset.estadoAnterior;
        mensagemFormacao.textContent = erro.message;
    } finally {
        seletor.disabled = false;
    }
}

// Busca as formações disponíveis para apresentar no painel administrativo.
async function carregarFormacoesAdmin() {
    try {
        const resposta = await fetch("/formacoes");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as formações.");
        }

        formacoesAdmin = await resposta.json();
        renderizarFormacoesAdmin();
    } catch (erro) {
        console.error("Erro ao carregar formações:", erro);
        mensagemListaFormacoes.textContent = "Não foi possível carregar as formações.";
    }
}

// Remove uma formação após confirmação do administrador.
async function removerFormacao(id) {
    const formacao = formacoesAdmin.find((item) => item.id === id);

    if (!formacao || !window.confirm(`Remover a formação "${formacao.nome}"?`)) {
        return;
    }

    try {
        const resposta = await fetch(`/formacoes/${id}`, { method: "DELETE" });
        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagemListaFormacoes.textContent = dados.mensagem;
            return;
        }

        formacoesAdmin = formacoesAdmin.filter((item) => item.id !== id);
        renderizarFormacoesAdmin();
        mensagemListaFormacoes.textContent = dados.mensagem;
    } catch (erro) {
        console.error("Erro ao remover formação:", erro);
        mensagemListaFormacoes.textContent = "Não foi possível remover a formação.";
    }
}

// Carrega a tabela de inscrições e mostra o estado atual de cada candidato.
async function carregarInscricoes() {

    try {

        const resposta = await fetch("/inscricoes");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as inscrições.");
        }

        const inscricoes = await resposta.json();
        contadorInscricoes.textContent = `${inscricoes.length} ${inscricoes.length === 1 ? "inscrição" : "inscrições"}`;

        listaInscricoes.innerHTML = "";

        inscricoes.forEach((inscricao) => {

            const linha = document.createElement("tr");

            const estadoAtual = inscricao.estado || "PENDENTE";

            linha.innerHTML = `
                <td>${inscricao.id}</td>
                <td>${escaparHtml(inscricao.nome)}</td>
                <td>${escaparHtml(inscricao.email)}</td>
                <td>${escaparHtml(inscricao.formacao)}</td>
                <td>${inscricao.data_inscricao}</td>
                <td><span class="estado estado-${estadoAtual.toLowerCase()}">${escaparHtml(estadoAtual)}</span></td>
                <td>
                    <select class="seletor-estado" data-estado-anterior="${escaparHtml(estadoAtual)}" aria-label="Alterar estado da inscrição ${inscricao.id}">
                        <option value="PENDENTE" ${estadoAtual === "PENDENTE" ? "selected" : ""}>Pendente</option>
                        <option value="APROVADO" ${estadoAtual === "APROVADO" ? "selected" : ""}>Aprovado</option>
                        <option value="REPROVADO" ${estadoAtual === "REPROVADO" ? "selected" : ""}>Reprovado</option>
                    </select>
                </td>
            `;

            listaInscricoes.appendChild(linha);

            linha.querySelector(".seletor-estado").addEventListener("change", (evento) => {
                atualizarEstadoInscricao(inscricao.id, evento.target.value, evento.target);
            });
        });

    } catch (erro) {

        console.error("Erro:", erro);

        listaInscricoes.innerHTML = `
            <tr>
                <td colspan="7">
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

        const resposta = await fetch(formacaoEmEdicao ? `/formacoes/${formacaoEmEdicao}` : "/formacoes", {
            method: formacaoEmEdicao ? "PUT" : "POST",

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
            limparFormularioFormacao();
            await carregarFormacoesAdmin();
        }

    } catch (erro) {

        console.error("Erro:", erro);

        mensagemFormacao.textContent =
            "Erro ao adicionar formação.";
    }
});

btnCancelarEdicao.addEventListener("click", limparFormularioFormacao);
pesquisaFormacoes.addEventListener("input", renderizarFormacoesAdmin);

carregarFormacoesAdmin();