'use strict';


class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }


    addToStorage(){
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render(){
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem.bind(this));
        this.addToStorage();
    }

    createItem(todo){
        const li = document.createElement('li');
        li.key = todo.key;
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
            `);
        if(todo.completed){
            this.todoCompleted.append(li);
        } else{
            this.todoList.append(li);
        }
    }

    addTodo(e){
        e.preventDefault();
        if(this.input.value.trim()){
            const newTodo  = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            }
            this.render();
            this.todoData.set(newTodo.key, newTodo);
        }
        else{
            alert("Пустое дело добавлять нельзя!");
        }
    }

    deleteItem(target){
        const itemParent = target.closest('.todo-item');
        this.todoData.forEach((item) => {
            if(item.key === itemParent.key){
                this.todoData.delete(item.key);
            }
        });
        this.render();

    }

    completedItem(target){
        const itemParent = target.closest('.todo-item');
        this.todoData.forEach((item) => {
            if(item.key === itemParent.key){
                item.completed = !item.completed;
            }
        });
        this.render();
    }

    handler(event){
        const target = event.target;
        if(!(target.matches('.todo-complete') || target.matches('.todo-remove'))){
            return;
        }
        if(target.matches('.todo-complete')){
            this.completedItem(target);
        }
        else{
            this.deleteItem(target);
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
    }

    init () {
        this.todoList.addEventListener('click', this.handler.bind(this));
        this.todoCompleted.addEventListener('click', this.handler.bind(this));
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
