# HarmonIQ 🎵

Conversor de partituras PDF para MIDI com loja integrada.

## O que é?

Um projeto de estudos onde você pode fazer upload de partituras em PDF, converter pra MIDI (basicamente), gerenciar créditos e comprar mais funcionalidades. Frontend em React, backend em Node.

## Principais recursos

- Upload de PDFs (conversão de partitura pro MIDI)
- Autenticação com JWT (login/registro)
- Dashboard com créditos
- Loja com carrinho (ainda tá meio básico)
- Tailwind + componentes do Radix

## Estrutura do projeto

- `Frontend` (raiz): Vite + React. Páginas principais em `src/pages`.
- `Backend/`: API Node/Express com rotas montadas em `/auth`, `/users`, `/conversions`.

## Tecnologias

- Frontend: React 18, Vite, Tailwind CSS, Radix UI, Framer Motion
- Backend: Node.js, Express, MySQL 8.0+
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

2. Configurar MySQL:

Certifique-se de que MySQL está rodando. Execute o schema para criar o banco:

```bash
mysql -u root < Backend/schema.sql
```

3. Backend:

Crie um arquivo `.env` no diretório `Backend/` com as credenciais do MySQL:

```env
PORT=3001
JWT_SECRET=sua_chave_secreta_aqui
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=harmoniq
```

Depois instale e rode:

```bash
cd Backend
npm install
npm run dev
```

O backend inicia em `http://localhost:3001` (ver `Backend/server.js`). A API monta as rotas principais em `/auth`, `/users` e `/conversions`.

Observações:
- Você precisa ter MySQL 8.0+ instalado e rodando
- O schema está em `Backend/schema.sql` - execute esse arquivo pra criar as tabelas

## Variáveis de ambiente

Backend carrega `.env` via `dotenv`. Variáveis necessárias:

- `PORT` - porta do servidor (padrão: 3001)
- `JWT_SECRET` - chave para assinar JWTs (gere uma string forte!)
- `DB_HOST` - host do MySQL (padrão: localhost)
- `DB_USER` - usuário MySQL (padrão: root)
- `DB_PASSWORD` - senha do MySQL
- `DB_NAME` - nome do banco (padrão: harmoniq)

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

- [ ] Persistência de uploads (S3 ou Supabase)
- [ ] Validar entradas melhor
- [ ] Adicionar testes (Jest/Cypress)
- [ ] Integrar conversão real de PDF → MIDI
- [ ] Dashboard com histórico de conversões funcionando
- [ ] Loja com integração de pagamento real

## Onde procurar o código

- Páginas React: `src/pages`
- Componentes: `src/components`
- Contexto de autenticação: `src/contexts/AuthContext.jsx`
- API client frontend: `src/services/api.js`
- Backend express: `Backend/server.js` e `Backend/routes`

## Contato

Qualquer dúvida, abre uma issue ou me manda mensagem.
