'use strict'
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';
var gTodosSort = 'txt';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo(`Learn HTML `, 2), createTodo('Practice CSS', 3)];
}

function createTodo(txt, importent) {
    return {
        id: makeId(),
        txt: txt,
        time: createAt(),
        importent: importent,
        isDone: false
    }
}

function getTodos() {
    var filteredTodos = gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
    return sortFilter(filteredTodos)
}

function sortFilter(filteredArr) {
    if (gTodosSort === 'txt') {
        return filteredArr.sort(function (a, b) {
            var a = a[gTodosSort].toLowerCase();
            var b = b[gTodosSort].toLowerCase();
           
            if (a > b) return 1;
            if (a > b) return -1;
            return 0;
        })
    }
    else if (gTodosSort === 'importent') {
        return filteredArr.sort(function (a, b) {
            return a[gTodosSort] - b[gTodosSort];
        })
    }
    else {
        return filteredArr.sort(function (a, b) {
            var a = a[gTodosSort];
            var b = b[gTodosSort];
            return a - b;
        })
    }
}

function addTodo(todoTxt, impotrent) {
    gTodos.unshift(createTodo(todoTxt, impotrent));
    saveToStorage(KEY_TODOS, gTodos);
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    gTodosFilter = statusFilter;
}

function setSort(sortFilter) {
    gTodosSort = sortFilter;

    console.log(gTodosSort);
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}
