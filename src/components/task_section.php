<div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg border-0 mb-4">
            <div class="card-header task-section-header p-3 cursor-pointer" id="task-section-toggle">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">
                        <i class="bi bi-list-check me-2"></i>Minhas Tarefas
                    </h5>
                    <i class="bi bi-chevron-down toggle-icon"></i>
                </div>
            </div>
            <div class="card-body p-4 task-section-content collapsed">
                <form id="task-form" class="task-input mb-4">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Adicione uma nova tarefa..." id="new-task">
                        <button class="btn btn-primary" type="submit" id="add-task">
                            <i class="bi bi-plus-lg me-1"></i>Adicionar
                        </button>
                    </div>
                </form>
                <div class="task-filters mb-3">
                    <div class="btn-group w-100">
                        <button class="btn btn-outline-primary active" data-filter="all">Todas</button>
                        <button class="btn btn-outline-primary" data-filter="active">Pendentes</button>
                        <button class="btn btn-outline-primary" data-filter="completed">Concluídas</button>
                    </div>
                </div>
                <div class="task-list">
                    <ul id="tasks" class="list-group list-group-flush"></ul>
                    <div class="text-center py-4 empty-list">
                        <i class="bi bi-clipboard-check fs-1 text-muted"></i>
                        <p class="text-muted mt-2">Nenhuma tarefa adicionada</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
