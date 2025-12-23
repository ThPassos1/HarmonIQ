# TODOs do Projeto

## Frontend
- [ ] Implementar conversão real de PDF → MIDI (integrar serviço externo)
- [ ] Carregar histórico de conversões no Dashboard da API
- [ ] Validar email corretamente (formato, existência)
- [ ] Melhorar UX do carrinho (persistir entre sessões)
- [ ] Integrar pagamento real na loja (Stripe/PayPal)
- [ ] Adicionar testes (Jest + React Testing Library)
- [ ] Tratar erros de rede melhor
- [ ] Mobile responsividade (tá funcional mas pode melhorar)

## Backend
- [ ] Criar migrations do banco (SQLite → SQL Schema)
- [ ] Implementar upload real de arquivos (multipart/form-data)
- [ ] Endpoint de conversão PDF → MIDI integrado
- [ ] Salvar conversões no histórico do usuário
- [ ] Refatorar auth middleware (tá repetido em vários lugares)
- [ ] Adicionar validação de entrada (sanitize queries)
- [ ] Refresh tokens para JWT
- [ ] Testes unitários
- [ ] Rate limiting nas rotas

## Geral
- [ ] Documentação de API (Swagger/OpenAPI)
- [ ] CI/CD melhorado
- [ ] Variáveis de ambiente bem definidas
- [ ] Deploy de produção (backend)
- [ ] Monitoramento e logs
