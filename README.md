# Classificação Risco Saúde Mental

## Instruções básicas para dar seguimento ao desenvolvimento

### Pré-requisitos

1. Ter instalados docker e docker-compose.

### Instruções

1. Clonar repositório
2. Definir arquivo .env conforme variáveis mostradas no arquivo .env.example
3. Abra um terminal e navegue até a pasta do projeto
4. Rode o comando "docker-compose up" caso queira visualizar os logs do container
5. Ou rode o comando "docker-compose up -d" para poder continuar utilizando o terminal
6. Para visualizar de forma gráfica os containers, volumes e imagens do docker a utiliza a extensão do Docker para Visual studio Code feita pela Microsoft
7. Para parar do containers por CLI utilize o comando "docker-compose down"
8. Após a inicialização dos containers é possível visualizar a database pelo DBeaver utilizando as credenciais definidas nas variáveis de ambiente
9. Não é necessário parar ou desinstalar o Postgres local, pois a API está utilizando uma porta diferente da padrão.
