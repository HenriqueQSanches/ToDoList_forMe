/**
 * Utilitários gerais
 * 
 * Funções auxiliares que uso em diferentes lugares da aplicação.
 * Coloquei aqui para evitar repetir código e facilitar manutenção.
 * 
 * @author Henrique Sanches
 * 
 * Essas funções são bem genéricas, então posso reutilizá-las em outros projetos.
 */
'use strict';

/**
 * Coleção de funções auxiliares
 */
const Helpers = {
    /**
     * Escapa HTML para evitar XSS
     * 
     * Segurança básica - previne que alguém injete tags
     * maliciosas usando o campo de título da tarefa.
     * 
     * @param {string} text - Texto a ser escapado
     * @returns {string} - HTML seguro
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
        
    },
    
    /**
     * Formata data para o padrão brasileiro
     * 
     * Útil para exibir datas em formato legível nos cards de tarefas.
     * Usei toLocaleDateString pois é mais simples que formatar manualmente.
     * 
     * @param {string|Date} date - Data a ser formatada
     * @returns {string} - Data no formato DD/MM/YYYY
     */
    formatDate(date) {
        if (!date) return '';
        
        // Se for uma string, converte para objeto Date
        const dateObj = new Date(date);
        
        // Verifica se é uma data válida
        if (isNaN(dateObj.getTime())) {
            console.warn('Data inválida:', date);
            return 'Data inválida';
        }
        
        // Formata para o padrão brasileiro
        return dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Eu poderia usar uma lib como dayjs ou date-fns
        // para formatação mais avançada, se necessário
    },
    
    /**
     * Gera um ID único simples
     * 
     * Útil para IDs temporários antes de salvar no banco.
     * Não é UUID, mas para nosso uso é suficiente.
     * 
     * @returns {string} - ID único baseado em timestamp e número aleatório
     */
    generateId() {
        // Combina timestamp com um número aleatório
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        
    }
};
