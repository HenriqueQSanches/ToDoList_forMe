/**
 * Gerenciador de Tarefas
 * 
 * Este componente faz a ponte entre a interface de usuário e o
 * back-end. Ele mantém o estado da aplicação e coordena as operações
 * com tarefas.
 * 
 * @author Henrique Sanches
 * 
 * Histórico de alterações:
 * - 10/01/23: Primeira implementação
 * - 15/02/23: Refatorei para usar async/await
 * - 03/03/23: Separei a lógica de UI da lógica de negócio
 */
'use strict';

/**
 * Gerenciador central de tarefas
 */
const TaskManager = {
    // Referências para outros componentes
    apiService: null,
    uiManager: null,
    
    // Estado atual da aplicação
    state: {
        currentFilter: 'all', // Filtro padrão: mostrar todas as tarefas
        currentUser: 'default_user' // Usuário inicial
    },
    
    /**
     * Inicializa o gerenciador
     * 
     * Recebe dependências via injeção para facilitar testes e
     * possíveis substituições no futuro.
     * 
     * @param {Object} config - Objeto com dependências
     */
    init({ apiService, uiManager }) {
        if (!apiService || !uiManager) {
            console.error("TaskManager: Dependências não fornecidas!");
            return;
        }
        
        this.apiService = apiService;
        this.uiManager = uiManager;
        
        // Verifica se há um seletor de usuário na página
        const userSelect = document.getElementById('current-user');
        if (userSelect) {
            this.state.currentUser = userSelect.value;
        }
        
        // Configura eventos
        this.bindEvents();
        
        // Carrega tarefas iniciais
        this.loadTasks();
    },
    
    /**
     * Associa eventos aos elementos da interface
     * 
     * Procurei centralizar todos os eventos relacionados a tarefas
     * aqui para ter melhor controle.
     */
    bindEvents() {
        // Formulário de adicionar tarefas
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', this.handleAddTask.bind(this));
        }
        
        // Botões de filtro (Todas/Pendentes/Concluídas)
        const filterButtons = document.querySelectorAll('.task-filters button');
        if (filterButtons) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.handleFilterChange(button);
                });
            });
        }
        
        // Seletor de usuário (quando implementado)
        const userSelect = document.getElementById('current-user');
        if (userSelect) {
            userSelect.addEventListener('change', () => {
                this.state.currentUser = userSelect.value;
                this.loadTasks();
            });
        }
    },
    
    /**
     * Trata o evento de adicionar uma tarefa
     * 
     * Recebe o evento de submit, impede o comportamento padrão,
     * extrai o valor do input e chama a função de adicionar tarefa.
     */
    handleAddTask(e) {
        e.preventDefault();
        
        const newTaskInput = document.getElementById('new-task');
        if (!newTaskInput) return;
        
        const title = newTaskInput.value.trim();
        if (!title) return; // Não permite tarefas vazias
        
        this.addTask(title);
    },
    
    /**
     * Trata a mudança de filtro
     * 
     * Atualiza o filtro ativo e recarrega as tarefas
     * conforme o filtro selecionado.
     */
    handleFilterChange(button) {
        // Atualiza visual dos botões
        document.querySelectorAll('.task-filters button').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');
        
        // Atualiza o estado e recarrega
        this.state.currentFilter = button.getAttribute('data-filter');
        this.loadTasks();
    },
    
    /**
     * Carrega as tarefas do usuário atual
     * 
     * Busca as tarefas na API e atualiza a interface.
     * O filtro é aplicado após buscar todas as tarefas.
     */
    async loadTasks() {
        try {
            const response = await this.apiService.getTasks(this.state.currentUser);
            
            if (response.success) {
                // Filtra as tarefas conforme necessário
                let tasks = response.data;
                
                if (this.state.currentFilter !== 'all') {
                    const statusFilter = this.state.currentFilter === 'completed' ? 'completed' : 'pending';
                    tasks = tasks.filter(task => task.status === statusFilter);
                }
                
                // Passa para o UIManager renderizar
                this.uiManager.renderTasks(tasks);
            } else {
                this.uiManager.showError('Erro ao carregar tarefas:', response.message);
            }
        } catch (error) {
            this.uiManager.showError('Erro na requisição:', error);
        }
    },
    
    /**
     * Adiciona uma nova tarefa
     * 
     * Envia a tarefa para a API e atualiza a interface após o sucesso.
     */
    async addTask(title) {
        try {
            const response = await this.apiService.addTask(this.state.currentUser, title);
            
            if (response.success) {
                // Limpa o input e recarrega a lista
                document.getElementById('new-task').value = '';
                this.loadTasks();
            } else {
                this.uiManager.showError('Erro ao adicionar tarefa:', response.message);
            }
        } catch (error) {
            this.uiManager.showError('Erro na requisição:', error);
        }
    },
    
    /**
     * Atualiza o status de uma tarefa
     * 
     * Chamada principalmente pelo checkbox para
     * marcar/desmarcar tarefas como concluídas.
     */
    async updateTaskStatus(taskId, status) {
        try {
            const response = await this.apiService.updateTaskStatus(
                this.state.currentUser, taskId, status);
            
            if (response.success) {
                this.loadTasks();
            } else {
                this.uiManager.showError('Erro ao atualizar tarefa:', response.message);
            }
        } catch (error) {
            this.uiManager.showError('Erro na requisição:', error);
        }
    },
    
    /**
     * Remove uma tarefa
     * 
     * Pede confirmação antes de excluir permanentemente.
     */
    async deleteTask(taskId) {
        // Sempre bom confirmar antes de deletar
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
        
        try {
            const response = await this.apiService.deleteTask(
                this.state.currentUser, taskId);
            
            if (response.success) {
                this.loadTasks();
            } else {
                this.uiManager.showError('Erro ao excluir tarefa:', response.message);
            }
        } catch (error) {
            this.uiManager.showError('Erro na requisição:', error);
        }
    }
};
