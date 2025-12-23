# HarmonIQ

> HarmonIQ — conversor de partituras (frontend em React + backend em Node/Express).

## Visão geral

HarmonIQ é uma aplicação web que permite aos usuários carregar partituras em PDF e convertê-las para MIDI, além de oferecer uma pequena loja e painel de usuário. O frontend usa Vite + React com Tailwind e componentes Radix/UI; o backend é uma API em Node/Express usando SQLite (com amostra de configuração MySQL disponível).

## Principais recursos

- Upload de PDFs de partitura e conversão simulada para MIDI
- Autenticação (registro/login) e gerenciamento de sessão local
- Dashboard do usuário com créditos e histórico de conversões
- Loja com carrinho e integração de checkout (front-end)

## Estrutura do projeto

- `Frontend` (raiz): Vite + React. Páginas principais em `src/pages`.
- `Backend/`: API Node/Express com rotas montadas em `/auth`, `/users`, `/conversions`.

## Tecnologias

- Frontend: React 18, Vite, Tailwind CSS, Radix UI, Framer Motion
- Backend: Node.js, Express, sqlite3 (e `sqlite`), suporte a MySQL (config de pool em `Backend/config/db.js`)
- Autenticação: JWT

## Pré-requisitos

- Node.js (>= 18 recomendado)
- npm ou pnpm

## Como rodar (desenvolvimento)

1. Instalar dependências do frontend (raiz):

```bash
npm install
npm run dev
```

O frontend roda por padrão em `http://localhost:3000` (script `dev` usa Vite no `--port 3000`).

2. Backend:

```bash
cd Backend
npm install
npm run dev
```

O backend inicia em `http://localhost:3001` (ver `Backend/server.js`). A API monta as rotas principais em `/auth`, `/users` e `/conversions`.

Observações:
- O backend atual abre um arquivo SQLite local `./database.db` (veja `Backend/server.js`). Há também um arquivo de exemplo `Backend/config/db.js` com pool MySQL.
- Caso queira usar MySQL, adapte a conexão e crie o banco `harmoniq` conforme o arquivo `Backend/config/db.js`.

## Variáveis de ambiente

- O projeto carrega `.env` no backend via `dotenv`, então você pode adicionar variáveis conforme necessário (por exemplo `PORT`, `DATABASE_URL`, `JWT_SECRET`). Atualmente o servidor usa porta 3001 hard-coded, mas é simples alterá-la no `server.js`.

## Endpoints principais (resumo)

- `POST /auth/register` — registrar usuário (retorna token e user)
- `POST /auth/login` — autenticar (retorna token e user)
- Rotas de usuário em `/users` — ver `Backend/routes/userRoutes.js`
- Rotas de conversão em `/conversions` — ver `Backend/routes/conversionRoutes.js`

Observação: Para detalhes dos parâmetros e respostas, consulte as rotas em `Backend/routes`.

## Configurações do frontend

- O arquivo `src/services/api.js` aponta para `http://localhost:3001` como `API_URL`. Atualize esse valor para o endereço de produção quando for necessário.
- Autenticação no frontend persiste token e user em `localStorage` via `src/contexts/AuthContext.jsx`.

## Build para produção

- Frontend (na raiz):

```bash
npm run build
```

- Backend: gere um processo com `node server.js` ou use PM2/PM para produção. Ajuste variáveis de ambiente e a estratégia de persistência de arquivos (uploads) antes do deploy.

## Notas e melhorias sugeridas

- Persistência de uploads: mover arquivos para armazenamento em nuvem (S3, Supabase Storage) ao invés de salvar localmente.
- Migrations: adicionar migrações para gerenciar esquema do banco (ex.: Knex.js, Sequelize ou um script SQL dedicado).
- Segurança: garantir `JWT_SECRET` seguro e validação/limpeza de entradas do usuário.
- Testes: adicionar testes unitários e e2e (Jest, Playwright/Cypress).
- Integração real de conversão PDF → MIDI: conectar serviço de conversão real (externo ou interno) e endpoints para upload multipart/form-data.

## Onde procurar o código

- Páginas React: `src/pages`
- Componentes: `src/components`
- Contexto de autenticação: `src/contexts/AuthContext.jsx`
- API client frontend: `src/services/api.js`
- Backend express: `Backend/server.js` e `Backend/routes`

## Contato

Se quiser, eu posso:

- ajustar `.env.example`
- criar scripts de deploy
- adicionar instruções de uso mais detalhadas para cada endpoint

---

Arquivo criado automaticamente por assistente. Boa parte do comportamento está implementado no frontend (upload/UX); verifique os controllers do backend para integrar a conversão real.
