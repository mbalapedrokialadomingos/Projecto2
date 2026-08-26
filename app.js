








































/*const nome = "Rede Academy";
const area = "Redes de Computadores";
const modalidade = "Online";
const nome_do_formador = "Mbala Pedro Kiala Domingos";
let vagas = 10;
console.log(nome);
console.log(area);
console.log(modalidade);
console.log(vagas);
console.log(typeof area);
const isncricoesabertas=true;
if(vagas && isncricoesabertas >0){
console.log("Ainda há vagas!");
}else{
    console.log("Vagas esgotadas!");
}
function mensagem() {
console.log("Inscrição realizada, Bem vinda à rede Academy"+nome_do_formador);
}
mensagem();
function ApresentarAluno(nome){
    console.log("Bem vindo À rede Academy, "+nome)
}
ApresentarAluno("Chris");
function CalcularPrecoComDesconto(preco, desconto){
return preco-(preco*(desconto/100));
}
const resultado = CalcularPrecoComDesconto(25000 , 10);
console.log(resultado);
function Curso(nomedocurso , precodocurso){
    console.log("Curso: "+ nomedocurso+ ("\n")+ "preco: " +precodocurso);
}
Curso("Informática" , 40000);
Curso("Comunicação Via Satélite (VSAT)" , 80000);
const cursos =["CCTV" , "VOIP" , "PABX"];
cursos.push("HCIA DATACOM");
for(let i=0; i<=cursos.length-1; i++){
console.log(cursos[i]);
}

const titulo = document.getElementById("titulo");
titulo.textContent = "Rede Academy - Formação em Redes";

const paragrafo = document.getElementById("paragrafo");
paragrafo.textContent = "Mbala Pedro Kiala Domingos - Formador";

let Cursos = [
    {
        nome: "VOIP",
        preco: 40000,
        Duração: "1 Semana",
        modalidade: "Online"
    },
     {
        nome: "CCNA Cisco",
        preco: 25000,
        Duração: "4 Semanas",
        modalidade:"Presencial"
    },
     {
        nome: "CCNP Encorse",
        Preco: 80000,
        Duração: "3 Semanas",
        modalidade:"Online"
    }
]
Cursos.forEach(function(curso){
    console.log(curso.nome);
});

//Forma mais moderna
Cursos.forEach((curso) =>
    {
        console.log(curso.nome);
});

//O map pega uma lista e cria uma lista apartir dela
const nomes = Cursos.map((curso) =>{
    return curso.nome;
});
console.log(nomes);

const onlines = Cursos.filter((curso)=>{
    return curso.modalidade === "Online";
});
console.log(onlines);*/