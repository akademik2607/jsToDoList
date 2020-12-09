'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    if(localStorage.todoData){
        todoData = JSON.parse(localStorage.todoData);
        todoData.forEach(function(item){
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
			    '<div class="todo-buttons">' +
			    '<button class="todo-remove"></button>' + 
			    '<button class="todo-complete"></button>' +
			    '</div>';
            if(item.completed){
                todoCompleted.append(li);
            }else{
                todoList.append(li);
            }
            const btnTodoCompleted = li.querySelector('.todo-complete'),
                btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoCompleted.addEventListener('click', function(){
                item.completed = !item.completed;
                localStorage.todoData = JSON.stringify(todoData);
                render();
            });
            btnTodoRemove.addEventListener('click', function(){
                const index = todoData.indexOf(item);
                todoData.splice(index, 1);
                localStorage.todoData = JSON.stringify(todoData);
                render();
            });
        });
    }  
    localStorage.todoData = JSON.stringify(todoData);
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    }
    if(newTodo.value.trim() !== ''){
        headerInput.value = '';
        todoData = JSON.parse(localStorage.todoData);
        todoData.push(newTodo);
        localStorage.todoData = JSON.stringify(todoData);
        render();
    }
});

render();
