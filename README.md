<h1 align="center"><strong>Classificação de Risco ed Saúde Mental API</strong></h1>

API criada para suprir as necessidades de um sistema para teleatendimento de gestão de risco clínico, tendo por objetivo estabelecer prioridades para o atendimento dos pacientes de saúde mental que acessam o sistema de saúde e também definir o recurso assistencial mais adequado a cada caso. Tem como principal objetivo a identificação dos casos mais graves, permitindo um atendimento mais rápido e seguro de acordo com o potencial de risco, agravos à saúde ou grau de sofrimento.

O url base da API é https://api-risco-saude-mental.herokuapp.com

<br/>

## **Principais Tecnologias Utilizadas**

<hr/>

- Typescript
- Nodejs
- Express
- TypeORM
- Postgres
- Docker
- Jest

<br/>

## **Endpoints**

<hr/>
Acesse https://api-risco-saude-mental.herokuapp.com/api/docs

<br/>

## **Utilizando a API localmente**

<hr/>

1. Clone este repositório
2. Em um terminal, navegue até a pasta do repositório clonado
3. Crie um arquivo .env conforme o arquivo .env.example
   1. Será criado um usuário admin conforme as variáveis de ambiente
4. Instale as dependências com yarn ou yarn install
5. Execute o comando docker-compose up
   1. Será criado um container para a aplicação e outro container para o banco de dados.
6. Para acessar a documentação dos endpoints localmente utilize a url http://localhost:3000/docs e troque o server para local

<br/>
