# BoraTreinar Recife - Backend

Servidor Node.js desenvolvido para o projeto final de ADS. 
Este servidor é responsável pela persistência dos dados de check-in dos usuários.

## Tecnologias
- Node.js
- Express
- FS (File System) para persistência em JSON

## Funcionalidades
- API RESTful para registro de check-ins (POST).
- Leitura do histórico de treinos do usuário (GET).

## Como rodar
1. Certifique-se de ter o Node.js instalado.
2. No terminal, dentro da pasta do backend, instale as dependências:
  npm install
  npm run dev
   

## Endpoints da API
- GET /checkins: Retorna a lista completa de check-ins realizados.
- POST /checkins: Registra um novo check-in (envie os dados da academia e a data).



