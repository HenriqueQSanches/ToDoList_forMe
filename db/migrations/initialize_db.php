<?php
try {
    $dbPath = __DIR__ . '/../db/data/todolist.db';
    $db = new PDO('sqlite:' . $dbPath);

    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Banco de dados inicializado com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao inicializar o banco de dados: " . $e->getMessage();
}
?>
