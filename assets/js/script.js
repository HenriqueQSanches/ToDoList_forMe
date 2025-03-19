/**
 * Arquivo principal da ToDoList
 * 
 * Este é o ponto de entrada da aplicação. Aqui inicializamos todos os
 * componentes e serviços. Tentei manter o arquivo principal o mais
 * limpo possível delegando responsabilidades específicas para módulos separados.
 * 
 * @author Henrique Sanches
 */
'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script carregado com sucesso!");
    
    /**
     * Aplicação principal
     * 
     * Serve como coordenador entre os diferentes componentes.
     * Preferi uma abordagem modular ao invés de classes para manter
     * a simplicidade, já que o projeto não é tão complexo.
     */
    const TodoApp = {
        /**
         * Inicializa a aplicação
         * 
         * Ordem de inicialização importante:
         * 1. ApiService - para configurar comunicação
         * 2. UIManager - para preparar a interface
         * 3. TaskManager - depende dos dois anteriores
         */
        init() {
            // Inicializa API - URL padrão do backend
            ApiService.init('/ToDoList/src/api/tasks.php');
            
            // Prepara a interface do usuário
            UIManager.init();
            
            // Inicializa o gerenciador de tarefas com suas dependências
            // Uso injeção de dependência para facilitar testes futuros
            TaskManager.init({
                apiService: ApiService,
                uiManager: UIManager
            });
        }
    };
    
    // Bora, agora vai!
    TodoApp.init();
});