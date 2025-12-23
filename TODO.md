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
- [x] Migrar de SQLite para MySQL
- [ ] Implementar outros routes (userRoutes, conversionRoutes) com MySQL
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
- [ ] Deploy de produção (backend)
- [ ] Monitoramento e logs
- [ ] Migração de dados do SQLite (se houver dados antigos)
