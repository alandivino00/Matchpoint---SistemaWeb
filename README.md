## Status do Projeto

### ✅ Implementado

#### Interface

* [x] Tela de Login (visual)
* [x] Tela de Eventos (visual + cards)
* [x] Tela de Detalhes do Evento (visual)
* [x] Tela de Criação de Evento (visual)
* [x] Tela "Meus Eventos" (visual)
* [x] Tela de Perfil (visual)
* [x] Sidebar de navegação
* [x] Layout responsivo
* [x] Dados mockados para demonstração

---

### ❌ Pendências

#### Frontend

* [x] Abas funcionais em "Meus Eventos" (Confirmados / Criados)
* [x] Gerenciamento de estado dos formulários (`useState`)
* [ ] Validações de formulário
* [x] Navegação entre páginas
* [x] Filtros funcionais
* [x] Busca funcional
* [ ] Implementação das ações dos botões
* [ ] Editar evento
* [ ] Cancelar evento
* [x] Editar perfil

#### Backend (NestJS)

* [x] Projeto NestJS criado
* [x] Módulos criados: `auth`, `users`, `events`, `participants`
* [x] Controllers e services criados
* [x] API básica de autenticação
* [x] API básica de eventos
* [x] API básica de usuários
* [x] API básica de confirmação de presença
* [x] Rota inicial do backend funcionando
* [x] Integração com banco de dados
* [x] Validações no backend
* [ ] Autenticação real com JWT (nao vou fazer)

#### Integração

* [x] Conectar Frontend ao NestJS
* [x] Persistência de dados em banco

### tasks
* falta funcionar o botão cadastrar, e confirmar presença

---

### Tecnologias

* Frontend: Next.js + React + TypeScript
* Backend: NestJS
* Estilização: CSS
* Controle de versão: Git e GitHub



### 1 - pra rodar o matchpoint

rode o back end com	

cd match-point-backend
npm run start:dev

acesse
http://localhost:3000

2 - rode o front end com

cd match-point
npm run dev

acesse e teste em:
http://localhost:3001
