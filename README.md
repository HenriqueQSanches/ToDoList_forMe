# 📋 ToDoList - Meu Organizador de Tarefas

Opa galera! Esse aqui é um app simples que eu criei pra organizar minhas tarefas diárias. 
Nada muito complexo, é mais um projeto pessoal mesmo pra eu treinar meu JavaScript e PHP, 
e claro, me ajudar a não esquecer das coisas que preciso fazer no dia a dia!

## 🔎 O que ele faz?

- Adiciona, remove e atualiza tarefas
- Marca tarefas como concluídas
- Filtra por tarefas pendentes/concluídas
- Salva o estado da interface (se as seções estão expandidas ou não)
- É super rápido e simples de usar!

## 🏗️ Estrutura do Projeto

O projeto tá organizado assim:

- `src/`: Todo o código PHP que roda no servidor
  - `api/`: Endpoints da API para manipular tarefas
  - `components/`: Componentes reutilizáveis do PHP
- `assets/`: Arquivos estáticos 
  - `js/`: Todos os scripts organizados por módulos
  - `css/`: Estilos da aplicação
- `db/`: Tudo relacionado ao banco de dados
  - `migrations/`: Scripts para criar as tabelas

## 🚀 Como rodar o projeto

Eu uso o XAMPP porque é mais prático pra mim. Sigo esses passos:

1. Coloque o projeto na pasta `htdocs` do XAMPP (exatamente onde está agora)
2. Inicie o Apache e o MySQL pelo painel de controle do XAMPP
3. Abra seu navegador e acesse:
   ```
   http://localhost/ToDoList/src/
   ```
4. Opcional: Para criar as tabelas do banco, acesse:
   ```
   http://localhost/ToDoList/db/migrations/create_table_users_db.php
   http://localhost/ToDoList/db/migrations/create_table_tasks_db.php
   ```

## 👨‍💻 Arquitetura do código

Decidi organizar o JavaScript em módulos para ficar mais fácil de manter:

- `ApiService`: Centraliza toda comunicação com o backend
- `TaskManager`: Gerencia a lógica de negócio das tarefas
- `UIManager`: Cuida da parte visual e interações com o DOM
- `Helpers`: Funções utilitárias que uso em vários lugares

## 🔮 Melhorias futuras

Algumas coisas que penso em implementar quando tiver tempo:

- [ ] Adicionar mais detalhes às tarefas (datas, prioridades)
- [ ] Implementar notificações para tarefas próximas do prazo
- [ ] Sistema de login/autenticação real
- [ ] Sincronização com calendário
- [ ] Versão PWA para usar offline

## ✍️ Autor

Feito com ☕ e código por **Henrique Sanches**.

---

*Obs: Se você encontrar este projeto, fique à vontade para usar como base para seus estudos! Qualquer dúvida é só abrir uma issue.*
