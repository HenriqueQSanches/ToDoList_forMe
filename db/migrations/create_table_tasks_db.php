<?php
require_once 'initialize_db.php';

// Arquivos separados para criação de tabelas, mantendo como um "migration" \\

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL, -- Campo para identificar o usuário
            title TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    echo "Tabela 'tasks' criada com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao criar a tabela 'tasks': " . $e->getMessage();
}
?>
