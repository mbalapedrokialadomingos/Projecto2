const http = require("http");
const fs = require("fs");
const path = require("path");
const { Client } = require ("pg");

const db = require("./db/database");
const bcrypt = require("bcrypt");
const sessoes = new Map();

function obterSessao(req) {

    const cookies = req.headers.cookie;

    if (!cookies) {
        return null;
    }

    const partes = cookies.split(";");

    for (const parte of partes) {

        const [nome, valor] = parte.trim().split("=");

        if (nome === "sessionId") {
            return valor;
        }
    }

    return null;
}

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/inscricao") {
        
    let dados = "";

    req.on("data", (parte) => {
        dados += parte;
    });

    req.on("end", async () => {

        try {
            const inscricao = JSON.parse(dados);
                    if (
                    !inscricao.nome ||
                    !inscricao.email ||
                    !inscricao.formacao
                ) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        mensagem: "Preencha todos os campos."
                    }));

                    return;
                }
                const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailValido.test(inscricao.email)) {
                        res.writeHead(400, {
                            "Content-Type": "application/json"
                        });

                        res.end(JSON.stringify({
                            mensagem: "Digite um email válido."
                        }));

                        return;
                    }

            const resultado = await db.query(
                `INSERT INTO inscricoes (nome, email, formacao)
                 VALUES ($1, $2, $3)
                 RETURNING id`,
                [
                    inscricao.nome,
                    inscricao.email,
                    inscricao.formacao
                ]
            );

            console.log("Inscrição guardada. ID:", resultado.rows[0].id);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Inscrição guardada com sucesso!"
            }));

        } catch (erro) {

            console.error("Erro ao guardar inscrição:", erro.message);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Erro ao guardar inscrição."
            }));
        }
    });

    return;
    
}
    if (req.method === "GET" && req.url === "/inscricoes") {

    db.query("SELECT * FROM inscricoes ORDER BY id DESC")
        .then((resultado) => {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(resultado.rows));
        })
        .catch((erro) => {

            console.error("Erro ao buscar inscrições:", erro.message);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Erro ao buscar inscrições."
            }));
        });

    return;
}
        if (req.method === "POST" && req.url === "/login") {

    let dados = "";

    req.on("data", (parte) => {
        dados += parte;
    });

    req.on("end", async () => {

        try {

            const login = JSON.parse(dados);

            const resultado = await db.query(
    `SELECT * FROM administradores
     WHERE usuario = $1`,
    [
        login.usuario
    ]
);

if (resultado.rows.length === 0) {

    res.writeHead(401, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        mensagem: "Usuário ou senha incorretos."
    }));

    return;
}

const administrador = resultado.rows[0];

const senhaCorreta = await bcrypt.compare(
    login.senha,
    administrador.senha
);

if (!senhaCorreta) {

    res.writeHead(401, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        mensagem: "Usuário ou senha incorretos."
    }));

    return;
}

            if (resultado.rows.length === 0) {

                res.writeHead(401, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    mensagem: "Usuário ou senha incorretos."
                }));

                return;
            }

            const sessionId = Math.random().toString(36).substring(2);

            sessoes.set(sessionId, login.usuario);

            res.writeHead(200, {
                "Content-Type": "application/json",
                "Set-Cookie": `sessionId=${sessionId}; HttpOnly; SameSite=Strict`
            });

            res.end(JSON.stringify({
                mensagem: "Login realizado com sucesso!"
            }));
        } catch (erro) {

            console.error("Erro no login:", erro.message);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Erro ao realizar login."
            }));
        }
    });

    return;
}
    if (req.method === "GET" && req.url === "/painel.html") {

    const sessionId = obterSessao(req);

    if (!sessionId || !sessoes.has(sessionId)) {

        res.writeHead(302, {
            "Location": "/admin.html"
        });

        res.end();

        return;
    }

    const caminhoPainel = path.join(__dirname, "painel.html");

    fs.readFile(caminhoPainel, (err, data) => {

        if (err) {

            res.writeHead(404);

            res.end("Painel não encontrado.");

            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });

    return;
}

if (req.method === "POST" && req.url === "/logout") {

    const sessionId = obterSessao(req);

    if (sessionId) {
        sessoes.delete(sessionId);
    }

    res.writeHead(200, {
        "Content-Type": "application/json",
        "Set-Cookie": "sessionId=; HttpOnly; Max-Age=0; SameSite=Strict"
    });

    res.end(JSON.stringify({
        mensagem: "Sessão encerrada."
    }));

    return;
}


if (req.method === "POST" && req.url === "/formacoes") {

    let dados = "";

    req.on("data", (parte) => {
        dados += parte;
    });

    req.on("end", async () => {

        try {

            const formacao = JSON.parse(dados);

            if (
                !formacao.nome ||
                !formacao.descricao ||
                !formacao.modalidade ||
                !formacao.preco
            ) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    mensagem: "Preencha todos os campos."
                }));

                return;
            }

            const resultado = await db.query(
                `INSERT INTO formacoes
                (nome, descricao, modalidade, preco)
                VALUES ($1, $2, $3, $4)
                RETURNING id`,
                [
                    formacao.nome,
                    formacao.descricao,
                    formacao.modalidade,
                    formacao.preco
                ]
            );

            console.log(
                "Formação criada. ID:",
                resultado.rows[0].id
            );

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Formação adicionada com sucesso!"
            }));

        } catch (erro) {

            console.error(
                "Erro ao adicionar formação:",
                erro.message
            );

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Erro ao adicionar formação."
            }));
        }
    });

    return;
}
if (req.method === "GET" && req.url === "/servicos") {

    db.query("SELECT * FROM servicos ORDER BY id ASC")

        .then((resultado) => {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(resultado.rows));

        })

        .catch((erro) => {

            console.error(
                "Erro ao buscar serviços:",
                erro.message
            );

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Erro ao buscar serviços."
            }));

        });

    return;
}

if (req.method === "GET" && req.url === "/formacoes") {

    db.query("SELECT * FROM formacoes ORDER BY id ASC")

        .then((resultado) => {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(resultado.rows));

        })

        .catch((erro) => {

            console.error("Erro ao buscar formações:", erro.message);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                mensagem: "Erro ao buscar formações."
            }));

        });

    return;
}

    let arquivo;

    if (req.url === "/") {
        arquivo = "index.html";
    } else {
        arquivo = req.url.substring(1);
    }

    const caminho = path.join(__dirname, arquivo);

    fs.readFile(caminho, (err, data) => {

        if (err) {
            res.writeHead(404);
            res.end("Arquivo não encontrado.");
            return;
        }

        let tipo = "text/plain";

        if (arquivo.endsWith(".html")) {
            tipo = "text/html";
        } else if (arquivo.endsWith(".css")) {
            tipo = "text/css";
        } else if (arquivo.endsWith(".js")) {
            tipo = "text/javascript";
        }

        res.writeHead(200, {
            "Content-Type": tipo
        });

        res.end(data);
    });

});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});