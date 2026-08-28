const { Client } = require("pg");

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "projecto2",
    password: "12345678",
    port: 5432
});

db.connect()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    })
    .catch((erro) => {
        console.error("Erro ao conectar ao banco de dados:", erro.message);
    });

module.exports = db;