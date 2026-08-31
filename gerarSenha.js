// Script auxiliar para gerar hashes de senha com bcrypt.
// Serve para criar rapidamente uma password segura para o admin ou outros utilizadores.
const bcrypt = require("bcrypt");

const senha = "12345678";

bcrypt.hash(senha, 10)
    .then((hash) => {
        console.log(hash);
    })
    .catch((erro) => {
        console.error(erro);
    });