# Trybe Futebol Clube!


![Exemplo app front](assets/front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

Esse foi um projeto desenvolvido durante o curso de desenvolvimento web da Trybe. A aplicação front-end foi fornecida. O objetivo era desenvolver a aplicação back-end e fazer a integração de ambas aplicações.

O back-end implementa as regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema. Assim, nesse projeto foi desenvolvido **um back-end dockerizado utilizando modelagem de dados através do Sequelize** respeitando as regras de negócio fornecidas.

É importante ressaltar que para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. 

Você pode acessar o deploy dessa aplicação utilizando esse [link]() (Ainda não está disponível). Para realizar o login e conseguir acessar todos os recursos da aplicação, você pode utilizar os seguintes dados de usuário:

* login: admin@admin.com
* password: secret_admin

## Tecnologias e Arquiteturas Utilizadas

A aplicação tentou aplicar a filosofia **SOLID** em conjunto com a arquitetura **MSC** e **orientação a objetos**. A seguir é apresentada a estrutura da aplicação back-end desenvolvida.

```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜leaderboard.controller.ts
 ┃ ┣ 📜matches.controllers.ts
 ┃ ┣ 📜teams.controller.ts
 ┃ ┗ 📜users.controller.ts
 ┣ 📂database
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜database.ts
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📜20220817195658-users.js
 ┃ ┃ ┣ 📜20220819215823-teams.js
 ┃ ┃ ┣ 📜20220820122738-matches.js
 ┃ ┃ ┣ 📜99999999999999-create-z.js
 ┃ ┃ ┣ 📜matches.txt
 ┃ ┃ ┗ 📜teams.txt
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜ExampleModel.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜matches.ts
 ┃ ┃ ┣ 📜teams.ts
 ┃ ┃ ┗ 📜users.ts
 ┃ ┗ 📂seeders
 ┃ ┃ ┣ 📜20211116145440-teams.js
 ┃ ┃ ┣ 📜20211116145458-matches.js
 ┃ ┃ ┗ 📜20211205212238-user.js
 ┣ 📂helpers
 ┃ ┗ 📜NewError.ts
 ┣ 📂interfaces
 ┃ ┣ 📜IId.ts
 ┃ ┣ 📜IJwt.ts
 ┃ ┣ 📜ILeaderboard.ts
 ┃ ┣ 📜ILogin.ts
 ┃ ┣ 📜IMatch.ts
 ┃ ┣ 📜IMatchComplete.ts
 ┃ ┣ 📜IMatchInProgress.ts
 ┃ ┣ 📜IMatchScore.ts
 ┃ ┣ 📜IRequestAuthorization.ts
 ┃ ┣ 📜ITeam.ts
 ┃ ┗ 📜IUsers.ts
 ┣ 📂middleware
 ┃ ┣ 📜error.middleware.ts
 ┃ ┣ 📜matches.middleware.ts
 ┃ ┣ 📜teams.middleware.ts
 ┃ ┗ 📜users.middleware.ts
 ┣ 📂routers
 ┃ ┣ 📜leaderboard.routes.ts
 ┃ ┣ 📜matches.routes.ts
 ┃ ┣ 📜teams.routes.ts
 ┃ ┗ 📜users.routes.ts
 ┣ 📂services
 ┃ ┣ 📂databaseInteraction
 ┃ ┃ ┣ 📜matches.service.ts
 ┃ ┃ ┣ 📜teams.service.ts
 ┃ ┃ ┗ 📜users.service.ts
 ┃ ┣ 📂leaderboard
 ┃ ┃ ┣ 📜dataTreatement.service.ts
 ┃ ┃ ┗ 📜leaderboard.service.ts
 ┃ ┗ 📂validation
 ┃ ┃ ┣ 📜hashPassword.service.ts
 ┃ ┃ ┗ 📜jwt.service.ts
 ┣ 📂tests
 ┃ ┣ 📂integrations
 ┃ ┣ 📂mocks
 ┃ ┃ ┣ 📂leaderboard
 ┃ ┃ ┃ ┣ 📜allResults.ts
 ┃ ┃ ┃ ┣ 📜awayResult.ts
 ┃ ┃ ┃ ┗ 📜homeResult.ts
 ┃ ┃ ┣ 📂matches
 ┃ ┃ ┃ ┣ 📜allMatches.ts
 ┃ ┃ ┃ ┣ 📜onlyFinished.ts
 ┃ ┃ ┃ ┣ 📜onlyInProgress.ts
 ┃ ┃ ┃ ┗ 📜validationCases.ts
 ┃ ┃ ┗ 📂teams
 ┃ ┃ ┃ ┗ 📜teams.ts
 ┃ ┣ 📜change.me.test.ts
 ┃ ┣ 📜leaderboard.test.ts
 ┃ ┣ 📜matches.test.ts
 ┃ ┣ 📜teams.test.ts
 ┃ ┣ 📜users.test.ts
 ┃ ┗ 📜validateUser.test.ts
 ┣ 📂types
 ┃ ┣ 📜reqWithBody.ts
 ┃ ┗ 📜userWithoutPassword.ts
 ┣ 📜app.ts
 ┗ 📜server.ts
```

A aplicação foi desenvolvida utilizando `Node.js` e `Typescript`. Para a elaboração da API foram utilizadas:
- [Express](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjTrrT6wuT5AhWvuZUCHUeBAq4QFnoECBAQAQ&url=https%3A%2F%2Fexpressjs.com%2F&usg=AOvVaw2dzc6U9bu173R4s1d9BYhT) para contruir a API;
- [Sequelize](https://sequelize.org/) que é um ORM (object-relational mapping) para gerenciar as operações com a base de dados;
- [Joi](https://www.npmjs.com/package/joi) para implementar as validações;
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para criar e validar tokens;
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) para encriptação de senhas;
- [ESLint](https://eslint.org/) para padronização do código.

MySQL foi utilizado para a criação da base de dados do projeto. No entanto, em função do uso do Sequelize, a base de dados foi criada e configurada utilizando models, migrations e seeders. Esses arquivos estão dentro do diretório database no backend.

Para a implementação dos testes de integração foram utilizadas:
- [Mocha.js](https://mochajs.org/)
- [Sinon.js](https://sinonjs.org/)
- [Chai](https://www.chaijs.com/)

### Documentação da API

A documentação da API implementada no back-end foi criada utilizando a ferramenta Postman. Você pode acessar a documentação [aqui](https://documenter.getpostman.com/view/21397186/VUr1GCc1). Na página você terá acesso a todas as rodas disponíveis, além da descrição dos parâmetros necessários à cada rota e exemplos de resposta.

## Estrutura do Projeto

O projeto é composto de 4 entidades importantes:

1️⃣ **Banco de dados:**

- Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
- Tem o papel de fornecer dados para o serviço de _backend_.
- Durante a execução dos testes sempre é acessado pelo `sequelize`.
- Os arquivos seeders foram fornecidos pela Trybe.

2️⃣ **Back-end:**

- É o ambiente que realizadas as implementações do projeto.
- A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`.
- Executa o `express` e utiliza a porta que vem das variáveis de ambiente.

3️⃣ **Front-end:**

- O front foi fornecido neste projeto pela Trybe. A única modificação foi a configuração do Dockerfile.
- Por padrão, o front se comunica com serviço de back-end pela url `http://localhost:3001`.

4️⃣ **Docker:**

- O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`.
- Os `Dockerfiles` nas raízes do `front-end` e `back-end` foram configurados para conseguir inicializar a aplicação.

## Rodando o Projeto na sua máquina

Na sua máquina você deve ter:

- Sistema Operacional Distribuição Unix
- Node versão 16 (versão igual ou superior à `16.15.0 LTS`)
- Docker
- Docker-compose versão >=1.29.2

A seguir você encontra um guia de como instalar e rodar o projeto localmente. Em caso de dúvidas, problemas ou feedbacks, entre em contato.

Passo 1. Crie o repositório local utilizando `mkdir`:

~~~bash
mkdir project-trybe-futebol-club 
~~~

Passo 2. Mude para o repositório criado:

~~~bash
cd project-trybe-futebol-club 
~~~

Passo 3. Clone o projeto:

~~~bash
git clone git@github.com:heitortessaro/trybe-futebol-clube.git
~~~

Passo 4. Mude para o diretório clonado:

~~~bash
cd trybe-futebol-clube
~~~

Passo 5. Inslate todas as dependências:

~~~bash
npm install
~~~

Step 6. Rode os containers da aplicação

~~~bash
npm run compose:up
~~~

### Acessando a Aplicação Localmente

Depois de subir os container da aplicação, você pode acessar o front-end utilizando o endereço http://localhost:3000.

Para realizar o login e conseguir acessar todos os recursos da aplicação, você pode utilizar os seguintes dados de usuário:

* login: admin@admin.com
* password: secret_admin

### Testando o Back-End

Neste projeto, a aplicação back-end foi desenvolvida seguindo os princípios do TDD (test driving development). Foram utilizados testes E2E (end-to-end), onde o comportamento do usuário é simulado, testando a integração várias partes do código ao mesmo tempo, diferentemente dos testes de unitários

Para rodar os testes na sua máquina, você primeiro precisa ir para o diretório do backend. Caso você esteja na pasta raíz do projeto, você pode utilizar o seguinte comando:

~~~bash
cd app/backend/
~~~

No diretório do back-end você pode rodas todos os testes com o comando:

~~~bash
npm test
~~~

Além disso, a cobertura dos testes também pode ser analisada com o comando:

~~~bash
npm run test:coverage
~~~

### Comandos Complementares

Caso você queira reiniciar a aplicação local, você pode desmontar os containers utilizando:

~~~bash
npm run compose:down
~~~

E depois reiniciar a aplicação com:

~~~bash
npm run compose:down
~~~

Já se você deseja reiniciar a base de dados, basta rodar:

~~~bash
npm run db:reset
~~~
