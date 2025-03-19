<?php
header('Content-Type: application/json');
require_once '../../db/Database.php';

// Prevenir erros de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Para requisições OPTIONS (pré-voo CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$db = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Definir um usuário padrão para todas as operações
$user = 'default_user';

// Manipular diferentes tipos de requisições
switch ($method) {
    case 'GET': // Listar tarefas
        try {
            $stmt = $db->prepare("SELECT * FROM tasks WHERE user = ? ORDER BY created_at DESC");
            $stmt->execute([$user]);
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $tasks]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
        
    case 'POST': // Adicionar tarefa
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['title']) || empty($data['title'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Título da tarefa é obrigatório']);
                exit;
            }
            
            $stmt = $db->prepare("INSERT INTO tasks (user, title, status) VALUES (?, ?, ?)");
            $status = isset($data['status']) ? $data['status'] : 'pending';
            $stmt->execute([$user, $data['title'], $status]);
            
            $taskId = $db->lastInsertId();
            
            // Retornar a tarefa recém-criada
            $stmt = $db->prepare("SELECT * FROM tasks WHERE id = ?");
            $stmt->execute([$taskId]);
            $task = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode(['success' => true, 'data' => $task]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
        
    case 'PUT': // Atualizar tarefa
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID da tarefa é obrigatório']);
                exit;
            }
            
            $stmt = $db->prepare("UPDATE tasks SET status = ? WHERE id = ? AND user = ?");
            $stmt->execute([$data['status'], $data['id'], $user]);
            
            // Retornar a tarefa atualizada
            $stmt = $db->prepare("SELECT * FROM tasks WHERE id = ?");
            $stmt->execute([$data['id']]);
            $task = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode(['success' => true, 'data' => $task]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
        
    case 'DELETE': // Excluir tarefa
        try {
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID da tarefa é obrigatório']);
                exit;
            }
            
            $stmt = $db->prepare("DELETE FROM tasks WHERE id = ? AND user = ?");
            $stmt->execute([$id, $user]);
            
            echo json_encode(['success' => true, 'message' => 'Tarefa excluída com sucesso']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Método não permitido']);
        break;
}
?>
