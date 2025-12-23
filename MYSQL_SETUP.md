# Setup do Banco de Dados (MySQL)

## Pré-requisitos

- MySQL 8.0 ou superior instalado
- Acesso de root ou usuário com permissões de criação de banco

## Criação do banco

### Opção 1: Via CLI

```bash
mysql -u root -p < Backend/schema.sql
```

Se o usuário não tiver senha:

```bash
mysql -u root < Backend/schema.sql
```

### Opção 2: Via MySQL Workbench ou cliente gráfico

1. Abra a conexão com seu MySQL
2. Copie o conteúdo de `Backend/schema.sql`
3. Execute na janela de query

## Configurar credenciais

Crie arquivo `Backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=harmoniq
JWT_SECRET=sua_chave_secreta_aqui
PORT=3001
```

## Verificar se funcionou

```bash
cd Backend
npm run dev
```

Se a conexão tiver sucesso, você verá:

```
✅ Conectado ao MySQL
🔥 API rodando em http://localhost:3001
```

## Troubleshooting

**Erro: Access denied for user 'root'@'localhost'**
- Verifique a senha no `.env`
- Certifique-se de que MySQL está rodando

**Erro: Unknown database 'harmoniq'**
- Execute o schema.sql novamente
- Verifique que não há erros de sintaxe

**Erro: Can't connect to MySQL server**
- Verifique se MySQL está rodando
- Verifique se host/port estão corretos
