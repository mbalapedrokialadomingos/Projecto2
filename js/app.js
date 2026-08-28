const listaformacoes = document.getElementById("listaformacoes");

const modalFormacao = document.getElementById("modalFormacao");

const conteudoModal = document.getElementById("conteudoModal");

const fecharModal = document.getElementById("fecharModal");

const btnformacoes = document.getElementById("btnformacoes");


// =========================
// BOTÃO VER FORMAÇÕES
// =========================

btnformacoes.addEventListener("click", () => {

    document.getElementById("formacoes")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// =========================
// CARREGAR FORMAÇÕES
// =========================

async function carregarFormacoes() {

    try {

        const resposta = await fetch("/formacoes");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar formações.");
        }

        const formacoes = await resposta.json();

        formacoes.forEach((formacao) => {

            const curso = document.createElement("div");

            curso.classList.add("card");

            curso.innerHTML = `
                <h3>${formacao.nome}</h3>

                <p>
                    Modalidade: ${formacao.modalidade}
                </p>

                <p>
                    Preço: ${formacao.preco} Kz
                </p>

                <p>
                    Descrição: ${formacao.descricao}
                </p>

                <button class="btn-ver-formacao">
                    Ver Formação
                </button>
            `;


            // =========================
            // BOTÃO VER FORMAÇÃO
            // =========================

            const botao =
                curso.querySelector(".btn-ver-formacao");


            botao.onclick = function () {

                conteudoModal.innerHTML = `

                    <div class="modal-formacao">

                        <h2>
                            ${formacao.nome}
                        </h2>

                        <p class="modal-descricao">
                            ${formacao.descricao}
                        </p>

                        <div class="modal-info">

                            <div class="modal-info-item">

                                <span>
                                    Modalidade
                                </span>

                                <strong>
                                    ${formacao.modalidade}
                                </strong>

                            </div>


                            <div class="modal-info-item">

                                <span>
                                    Investimento
                                </span>

                                <strong>
                                    ${formacao.preco} Kz
                                </strong>

                            </div>

                        </div>


                        <button
                            id="btninscricao"
                            class="btn-inscricao">

                            Inscrever-me

                        </button>

                    </div>

                `;


                // Abrir modal

                modalFormacao.classList.add("ativo");


                // =========================
                // BOTÃO INSCREVER-ME
                // =========================

                const btninscricao =
                    document.getElementById("btninscricao");


                btninscricao.onclick = function () {

                    conteudoModal.innerHTML = `

                        <div class="modal-formacao">

                            <h2>
                                Inscrição:
                                ${formacao.nome}
                            </h2>


                            <form
                                id="forminscricao"
                                class="form-modal"
                            >

                                <label for="nome">
                                    Nome completo
                                </label>

                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Digite o seu nome"
                                    required
                                >


                                <label for="email">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Digite o seu email"
                                    required
                                >


                                <button type="submit">
                                    Enviar inscrição
                                </button>


                                <div
                                    id="mensagemModal"
                                    class="mensagem-modal"
                                ></div>

                            </form>

                        </div>

                    `;


                    // =========================
                    // ENVIO DA INSCRIÇÃO
                    // =========================

                    const forminscricao =
                        document.getElementById("forminscricao");


                    forminscricao.onsubmit =
                        async function (event) {

                            event.preventDefault();


                            const nome =
                                document
                                    .getElementById("nome")
                                    .value;


                            const email =
                                document
                                    .getElementById("email")
                                    .value;


                            const mensagem =
                                document
                                    .getElementById("mensagemModal");


                            try {

                                const resposta =
                                    await fetch("/inscricao", {

                                        method: "POST",

                                        headers: {
                                            "Content-Type":
                                                "application/json"
                                        },

                                        body: JSON.stringify({

                                            nome: nome,

                                            email: email,

                                            formacao:
                                                formacao.nome

                                        })

                                    });


                                const data =
                                    await resposta.json();


                                mensagem.textContent =
                                    data.mensagem;


                                if (resposta.ok) {

                                    forminscricao.reset();

                                }


                            } catch (erro) {

                                console.error(
                                    "Erro:",
                                    erro
                                );


                                mensagem.textContent =
                                    "Não foi possível enviar a inscrição.";

                            }

                        };

                };

            };


            listaformacoes.appendChild(curso);

        });


    } catch (erro) {

        console.error("Erro:", erro);

        listaformacoes.innerHTML =
            "<p>Não foi possível carregar as formações.</p>";

    }

}


carregarFormacoes();


// =========================
// FECHAR MODAL
// =========================

fecharModal.onclick = function () {

    modalFormacao.classList.remove("ativo");

};


// Fechar clicando fora do modal

modalFormacao.onclick = function (event) {

    if (event.target === modalFormacao) {

        modalFormacao.classList.remove("ativo");

    }

};


// Fechar com ESC

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        modalFormacao.classList.remove("ativo");

    }

});


// =========================
// CARREGAR SERVIÇOS
// =========================

const listaservicos =
    document.getElementById("listaservicos");


async function carregarServicos() {

    try {

        const resposta =
            await fetch("/servicos");


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar serviços."
            );

        }


        const servicos =
            await resposta.json();


        servicos.forEach((servico) => {

            const card =
                document.createElement("div");


            card.classList.add("card");


            card.innerHTML = `

                <h3>
                    ${servico.nome}
                </h3>

                <p>
                    ${servico.descricao}
                </p>

                <p>
                    Preço: ${servico.preco} Kz
                </p>

            `;


            listaservicos.appendChild(card);

        });


    } catch (erro) {

        console.error("Erro:", erro);


        listaservicos.innerHTML =
            "<p>Não foi possível carregar os serviços.</p>";

    }

}


carregarServicos();