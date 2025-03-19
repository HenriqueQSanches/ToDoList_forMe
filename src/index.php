<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>

    <!-- Bootstrap IMPORTS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

    <!-- CSS customizado com timestamp para evitar cache -->
    <link rel="stylesheet" href="/ToDoList/assets/css/styles.css?v=<?php echo time(); ?>">
</head>
<body>
    <div class="container-fluid p-0">
        <header class="py-4 mb-4 shadow-sm">
            <div class="container text-center">
                <h1 class="fw-bold"><i class="bi bi-check2-square me-2"></i>Minha Lista de Tarefas</h1>
                <p class="text-light opacity-75">Organize suas atividades de forma simples e elegante</p>
            </div>
        </header>

        <main class="container mt-5">
            <!-- Componente Dropdown de seleção do Usuário -->
            <?php include 'components/user_dropdown.php'; ?>

            <!-- Seção de Tarefas -->
            <?php include 'components/task_section.php'; ?>
        </main>

    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Scripts da aplicação com timestamp para evitar cache -->
    <script src="/ToDoList/assets/js/utils/helpers.js?v=<?php echo time(); ?>"></script>
    <script src="/ToDoList/assets/js/services/ApiService.js?v=<?php echo time(); ?>"></script>
    <script src="/ToDoList/assets/js/components/UIManager.js?v=<?php echo time(); ?>"></script>
    <script src="/ToDoList/assets/js/components/TaskManager.js?v=<?php echo time(); ?>"></script>
    <script src="/ToDoList/assets/js/script.js?v=<?php echo time(); ?>"></script>

</body>
</html>