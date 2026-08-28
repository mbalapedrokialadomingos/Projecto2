const bcrypt = require("bcrypt");

const senha = "12345678";

bcrypt.hash(senha, 10)
    .then((hash) => {
        console.log(hash);
    })
    .catch((erro) => {
        console.error(erro);
    });