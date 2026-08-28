# Explicação do código JavaScript e DOM

## 1) O que é HTML, CSS e JavaScript?

O HTML define a estrutura da página. Ele cria elementos como:
- títulos
- parágrafos
- botões
- divs
- seções

O CSS deixa a página bonita, definindo cores, tamanhos, posições, margens e estilos.

O JavaScript faz a página reagir, ou seja, ele muda conteúdo, cria elementos, responde ao clique do botão e altera a interface do usuário.

Em resumo:
- HTML = estrutura
- CSS = visual
- JavaScript = comportamento

---

## 2) Entendendo o HTML do projeto

No ficheiro index.html, temos elementos como:

```html
<h1>Rede Academy</h1>
```

Essa linha cria um título grande na página.

```html
<p>Aprenda redes de computadores através da formação</p>
```

Essa linha cria um parágrafo.

```html
<button id="btnformacoes">Ver Formações</button>
```

Esse botão tem um identificador (`id`). Esse id é usado pelo JavaScript para encontrar o botão na página.

```html
<div id="listaformacoes"></div>
```

Essa div vai receber os cartões das formações criados em JavaScript.

```html
<div id="detalhesformacao"></div>
```

Essa div vai mostrar os detalhes da formação selecionada.

---

## 3) Entendendo o JavaScript

Agora vamos analisar o ficheiro js/app.js.

### 3.1 O array de formações

```javascript
const formacoes = [
    {
        nome: "Fundamentos de Rede",
        modalidade: "Online",
        Preco: 25000,
        Descricao: "Aprenda Redes Com os melhores formadores da nossa plataforma"
    },
    {
        nome: "HCIA DATACOM",
        modalidade: "Presencial",
        Preco: 30000,
        Descricao: "Se queres mergulhar nesse mundo, venha conosco"
    },
    {
        nome: "Fundamentos de Linux",
        modalidade: "Online",
        Preco: 10000,
        Descricao: "Ainda não dominas Linux?? Estás a espera do quê? "
    }
];
```

Aqui estamos a criar uma lista de formações.

Cada formação é um objeto com propriedades:
- nome
- modalidade
- Preco
- Descricao

É como se fosse um registo de dados, onde cada formação tem as suas informações.

---

### 3.2 Buscar elementos do HTML

```javascript
const listaformacoes = document.getElementById("listaformacoes");
const detalhesformacao = document.getElementById("detalhesformacao");
```

O `document` representa a página inteira.

O método `getElementById()` procura um elemento pelo seu id.

Ou seja:
- `listaformacoes` aponta para a div onde vamos mostrar as formações
- `detalhesformacao` aponta para a div onde vamos mostrar detalhes da formação selecionada

Isso é o DOM em ação.

---

### 3.3 Percorrer as formações

```javascript
formacoes.forEach((formacao) => {
```

O `forEach` percorre cada item do array.

Isso significa: para cada formação que estiver no array, o JavaScript vai fazer algo.

---

### 3.4 Criar um cartão para cada formação

```javascript
const curso = document.createElement("div");
```

Essa linha cria uma nova div no JavaScript.

É como criar um bloco novo, que depois será colocado na página.

```javascript
curso.classList.add("card");
```

A classe `card` pode ser usada no CSS para estilizar esse bloco.

---

### 3.5 Inserir conteúdo dentro do cartão

```javascript
curso.innerHTML = `
    <h3>${formacao.nome}</h3>
    <p>Modalidade: ${formacao.modalidade}</p>
    <p>Preço: ${formacao.Preco} Kz</p>
    <p>Descrição: ${formacao.Descricao}</p>
    <button class="btn-ver-formacao">Ver Formação</button>
`;
```

Aqui o JavaScript cria o HTML do cartão.

O `innerHTML` permite escrever código HTML dentro do elemento criado.

Exemplo:
- h3 com o nome da formação
- p com a modalidade
- p com o preço
- p com a descrição
- botão "Ver Formação"

O `${}` serve para inserir o valor da variável ou propriedade dentro do texto, por exemplo:

```javascript
${formacao.nome}
```

Essa expressão pega o nome da formação que está no objeto e coloca no HTML.

---

### 3.6 Selecionar o botão do cartão

```javascript
const botao = curso.querySelector("button");
```

`querySelector()` pesquisa um elemento dentro do cartão.

Aqui estamos a procurar o botão detro do cartão criado.

---

### 3.7 Evento de clique

```javascript
botao.onclick = function () {
    detalhesformacao.innerHTML = `
        <h2>${formacao.nome}</h2>
        <p>${formacao.Descricao}</p>
        <p>Modalidade: ${formacao.modalidade}</p>
        <p>Preço: ${formacao.Preco} Kz</p>
        <button>Inscrever-me</button>
    `;
};
```

Quando o botão é clicado, o JavaScript executa essa função.

Dentro dela:
- atualiza o conteúdo de `detalhesformacao`
- coloca os dados da formação selecionada

Ou seja, a página muda dinamicamente quando o usuário clica.

---

### 3.8 Adicionar o cartão na página

```javascript
listaformacoes.appendChild(curso);
```

`appendChild()` insere o cartão criado dentro da div `listaformacoes`.

Resultado: na página, aparecem vários cartões com as formações.

---

## 4) O que é DOM?

DOM significa Document Object Model.

É uma forma como o navegador representa a página HTML em objetos JavaScript.

Com o DOM, você pode:
- procurar elementos
- alterar textos
- criar novos elementos
- apagar elementos
- responder a eventos como clique

Alguns exemplos:

```javascript
document.getElementById("botao")
```

```javascript
document.createElement("div")
```

```javascript
element.innerHTML = "texto"
```

```javascript
element.textContent = "Novo texto"
```

---

## 5) Diferença entre console.log e textContent

```javascript
console.log("Inscrição realizada com sucesso!");
```

Essa linha mostra a mensagem no console do navegador, não na página.

Se queremos mostrar a mensagem na tela, usamos:

```javascript
mensagem.textContent = "Inscrição realizada com sucesso!";
```

Isso altera o conteúdo do elemento HTML escolhido.

---

## 6) Como ler este código corretamente

Quando você está a estudar JavaScript, tenta ler assim:

1. O que esta variável guarda?
2. O que este array representa?
3. Qual elemento HTML está a ser selecionado?
4. O que acontece quando esse botão é clicado?
5. O que está a ser criado dinamicamente?

Essa forma de leitura ajuda muito a entender a lógica.

---

## 7) Resumo final

O teu projeto usa JavaScript para:
- guardar dados em um array
- localizar elementos HTML
- criar blocos dinâmicos
- inserir informação na página
- reagir a cliques do utilizador

Esse é um exemplo clássico de DOM em JavaScript.

Você está a aprender como conectar:
- HTML + JavaScript + interatividade

---

## 8) Dica para praticar

Tenta fazer pequenas alterações no código:
- mudar a cor do botão
- alterar o texto do botão
- adicionar mais formações ao array
- mostrar o preço com outra moeda
- criar uma mensagem quando clicar no botão

Com prática, você vai perceber que JavaScript deixa a página viva.

---

## 9) Conclusão

O código que estamos a estudar mostra como a página pode ser modificada em tempo real.

Você não está só “escrevendo texto”; você está manipulando elementos da página com JavaScript.

Isso é o que chamamos de DOM: uma forma de controlar a interface do utilizador.

---

Se quiseres, posso também transformar este texto em um ficheiro mais bonito, em PDF ou em uma versão em formato de resumo para estudo rápido.
