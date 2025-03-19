/**
 * Serviço de comunicação com a API
 * 
 * Centraliza todas as chamadas para o backend aqui pra não
 * ter que ficar repetindo código fetch por todo o sistema.
 * Se precisarmos mudar de fetch para axios no futuro ou
 * adicionar headers de autenticação, só precisamos mexer aqui.
 * 
 * @author Henrique Sanches
 */
'use strict';

/**
 * Serviço de API
 * 
 * Tentei fazer o mais simples possível, sem callbacks
 * complicados, usando async/await pra facilitar a leitura.
 */
const ApiService = {
    // URL base da API - vai ser definida na inicialização
    baseUrl: '',
    
    /**
     * Define a URL base para requisições
     * 
     * @param {string} baseUrl - URL do endpoint da API
     */
    init(baseUrl) {
        this.baseUrl = baseUrl;
    },
    
    /**
     * Busca tarefas do usuário
     * 
     * Pega todas as tarefas de um usuário específico.
     * Não implementei paginação ainda, mas seria bom adicionar depois.
     * 
     * @param {string} user - ID ou nome do usuário
     * @returns {Promise} JSON com as tarefas ou erro
     */
    async getTasks(user) {
        try {
            const response = await fetch(`${this.baseUrl}?user=${user}`);
            return await response.json();
        } catch (error) {
            // Aqui eu poderia tratar cada tipo de erro específico
            // com base no status code, etc.
            console.error('Putz, erro ao buscar tarefas:', error);
            throw error;
        }
    },
    
    /**
     * Cria uma nova tarefa
     * 
     * Lá no backend o endpoint espera receber pelo menos o título
     * e usa o status padrão "pending" se não for informado.
     * 
     * @param {string} user - Identificação do usuário
     * @param {string} title - Título da tarefa (não pode ser vazio)
     * @returns {Promise} JSON com a tarefa criada ou erro
     */
    async addTask(user, title) {
        try {
            const response = await fetch(`${this.baseUrl}?user=${user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    },
    
    /**
     * Atualiza o status de uma tarefa
     * 
     * Usei essa função principalmente para marcar tarefas como
     * concluídas ou pendentes, mas poderíamos expandir para editar
     * outros campos no futuro.
     * 
     * @param {string} user - ID do usuário 
     * @param {number} taskId - ID da tarefa a atualizar
     * @param {string} status - Status novo ('completed' ou 'pending')
     * @returns {Promise} Resultado da operação
     */
    async updateTaskStatus(user, taskId, status) {
        try {
            const response = await fetch(`${this.baseUrl}?user=${user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: taskId, status })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Erro na atualização:', error);
            throw error;
        }
    },
    
    /**
     * Exclui uma tarefa
     * 
     * Deleta permanentemente. Talvez no futuro valha a pena
     * implementar um soft delete ou uma lixeira.
     * 
     * @param {string} user - ID do usuário
     * @param {number} taskId - ID da tarefa
     * @returns {Promise} Resultado da operação
     */
    async deleteTask(user, taskId) {
        try {
            const response = await fetch(
                `${this.baseUrl}?user=${user}&id=${taskId}`, 
                { method: 'DELETE' }
            );
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao excluir:', error);
            throw error;
        }
    }
};
