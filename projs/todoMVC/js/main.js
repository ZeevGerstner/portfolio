'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();    
    render();
}

function render() {
    renderTodos();
    renderStats();
}


function renderTodos() {
    var todos = getTodos();
    if(todos.length === 0 && gTodosFilter !== 'all') {
        document.querySelector('.todo-list').innerText = `No ${gTodosFilter} todos`;
    } 
    else if (todos.length === 0){
        document.querySelector('.todo-list').innerText = `No todos`;
    }
    else {
        
    var strHtmls = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')"
                   style="color:${getImportentColor(todo.importent)}">
                   ${todo.txt} 
                   <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                    &times;
                    </button>
                </li>`;
        })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
    }
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render(); 
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onSetSort(statusSort) {
    setSort(statusSort);
    render();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    
    if(addTodoImportent() && newTodoTxt.charAt(0) !== ' ') {
        addTodo(newTodoTxt,addTodoImportent());
    }
    else alert('Please enter todo and importence');

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function(){
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()
}

function addTodoImportent(){
    var elTodoImportent = document.querySelector('#importence');
    if(elTodoImportent.value > 0 && elTodoImportent.value <=3) {
        return elTodoImportent.value;
    }
    return false;
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    var isConfirm = confirm('Are you sure?');
    if(isConfirm){
        deleteTodo(todoId);
        render();
    } 
}

