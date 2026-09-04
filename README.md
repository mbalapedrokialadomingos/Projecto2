# UANJI

## Como executar o projeto

### Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL

### Instalação

1. Clone ou copie o projeto e entre na pasta:

   ```bash
   cd UANJI
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. No PostgreSQL, crie uma base de dados chamada `projecto2`.

4. Confirme as credenciais de acesso no arquivo `db/database.js`:

   - Utilizador: `postgres`
   - Palavra-passe: `12345678`
   - Host: `localhost`
   - Porta: `5432`
   - Base de dados: `projecto2`

### Iniciar o servidor

Execute:

```bash
npm start
```

Depois, abra no navegador:

```text
http://localhost:3000
```

As dependências do projeto estão definidas em `package.json` e as versões instaladas estão registadas em `package-lock.json`.
