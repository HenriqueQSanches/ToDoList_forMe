/**
 * Gerenciador de Interface do Usuário
 * 
 * Responsável por todas as manipulações do DOM e apresentação
 * visual. Separei toda a lógica visual da lógica de negócio para
 * facilitar manutenção.
 * 
 * @author Henrique Sanches
 * 
 * Nota pessoal: Tentei seguir um padrão parecido com o React,
 * onde a renderização é baseada no estado.
 */
'use strict';

/**
 * Gerenciador de UI
 * 
 * Concentra toda a manipulação do DOM aqui para evitar
 * bagunça no código principal.
 */
const UIManager = {
    // Referências a elementos DOM (cache)
    elements: {},
    
    /**
     * Inicializa o gerenciador de UI
     */
    init() {
        // Guarda referências aos elementos principais
        this.cacheElements();
        
        // Configura a funcionalidade de mostrar/ocultar seção de tarefas
        this.setupTaskSectionToggle();
    },
    
    /**
     * Armazena referências a elementos DOM
     * 
     * Evita ficar fazendo document.getElementById() várias vezes.
     * Percebi que isso melhorou a performance nas páginas com muitas tarefas.
     */
    cacheElements() {
        this.elements = {
            taskSectionToggle: document.getElementById('task-section-toggle'),
            taskSectionContent: document.querySelector('.task-section-content'),
            toggleIcon: document.querySelector('.toggle-icon'),
            tasksList: document.getElementById('tasks'),
            emptyListMessage: document.querySelector('.empty-list')
        };
    },
    
    /**
     * Configura o botão que mostra/esconde a seção de tarefas
     * 
     * Essa parte me deu trabalho para funcionar direito com a animação
     * e o estado salvo no localStorage.
     */
    setupTaskSectionToggle() {
        if (this.elements.taskSectionToggle && this.elements.taskSectionContent) {
            // Adiciona o evento de click
            this.elements.taskSectionToggle.addEventListener('click', 
                this.handleSectionToggle.bind(this));
            
            // Recupera o estado salvo no localStorage
            const savedState = localStorage.getItem('taskSectionCollapsed');
            if (savedState === 'false') { // Se estiver expandido
                this.elements.taskSectionContent.classList.remove('collapsed');
                this.elements.toggleIcon.classList.add('rotate');
            }
        }
    },
    
    /**
     * Função que alterna o estado de exibição da seção
     * 
     * Alterna as classes CSS e salva o estado atual no localStorage
     * para que a preferência do usuário seja mantida.
     */
    handleSectionToggle() {
        this.elements.taskSectionContent.classList.toggle('collapsed');
        this.elements.toggleIcon.classList.toggle('rotate');
        
        // Salva o estado atual
        const isCollapsed = this.elements.taskSectionContent.classList.contains('collapsed');
        localStorage.setItem('taskSectionCollapsed', isCollapsed);
    },
    
    /**
     * Renderiza a lista de tarefas na interface
     * 
     * Limpa a lista atual e renderiza as tarefas fornecidas.
     * Se não houver tarefas, exibe uma mensagem.
     * 
     * @param {Array} tasks - Lista de tarefas do usuário
     */
    renderTasks(tasks) {
        // Reset da lista
        this.elements.tasksList.innerHTML = '';
        
        // Se não tem tarefas, mostra mensagem
        if (tasks.length === 0) {
            this.elements.emptyListMessage.style.display = 'block';
            return;
        }
        
        // Tem tarefas - esconde a mensagem "sem tarefas"
        this.elements.emptyListMessage.style.display = 'none';
        
        // Usa DocumentFragment para melhorar performance
        // (evita vários reflows ao adicionar cada item)
        const fragment = document.createDocumentFragment();
        
        tasks.forEach(task => {
            const taskItem = this.createTaskElement(task);
            fragment.appendChild(taskItem);
        });
        
        // Adiciona todos os elementos de uma vez
        this.elements.tasksList.appendChild(fragment);
    },
    
    /**
     * Cria elemento DOM para uma tarefa
     * 
     * Encapsulei a criação do elemento para manter
     * a renderização padronizada.
     * 
     * @param {Object} task - Dados da tarefa
     */
    createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item task-item d-flex justify-content-between align-items-center';
        taskItem.dataset.id = task.id; // Guarda o ID como data attribute
        
        // Verifica se está concluída
        const isCompleted = task.status === 'completed';
        
        // Monta o HTML interno
        taskItem.innerHTML = `
            <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" ${isCompleted ? 'checked' : ''}>
                <label class="form-check-label ${isCompleted ? 'text-decoration-line-through text-muted' : ''}">
                    ${Helpers.escapeHtml(task.title)}
                </label>
            </div>
            <button class="btn btn-sm btn-danger delete-task">
                <i class="bi bi-trash"></i>
            </button>
        `;
        
        // Adiciona eventos
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            // Delegamos ao TaskManager
            TaskManager.updateTaskStatus(task.id, checkbox.checked ? 'completed' : 'pending');
        });
        
        const deleteBtn = taskItem.querySelector('.delete-task');
        deleteBtn.addEventListener('click', () => {
            // Delegamos ao TaskManager
            TaskManager.deleteTask(task.id);
        });
        
        return taskItem;
    },
    
    /**
     * Exibe mensagens de erro
     * 
     * No momento só loga no console, mas poderíamos
     * implementar notificações na UI.
     * 
     * @param {string} prefix - Descrição do erro
     * @param {Error|string} error - Objeto de erro ou mensagem
     */
    showError(prefix, error) {
        console.error(prefix, error);
        // TODO: Implementar toast ou notificação na interface
        // Por enquanto deixei só no console pra não complicar
    }
};
