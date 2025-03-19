<?php
require_once 'initialize_db.php';

// Criação da tabela de Usuários \\

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    ");

    echo "Tabela 'users' criada com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao criar a tabela 'users': " . $e->getMessage();
}


?>