const { Client } = require("pg");

// Cria a ligação ao PostgreSQL usando as credenciais locais do projeto.
// Esta instância será reutilizada por todas as rotas do servidor para
// consultar e guardar dados relacionadas com formações, inscrições e utilizadores.
const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "projecto2",
    password: "12345678",
    port: 5432
});

// Tenta abrir a ligação imediatamente ao iniciar a aplicação.
db.connect()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    })
    .catch((erro) => {
        console.error("Erro ao conectar ao banco de dados:", erro.message);
    });

module.exports = db;