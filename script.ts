/*const button: HTMLElement = document.getElementById("add")!;
const todolist: HTMLElement = document.getElementById("todolist")!;
const input: HTMLInputElement = document.getElementById("input")! as HTMLInputElement;

let todos: string[] = [];

window.onload = function() {
    todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(todo => addtodo(todo));
}

button.addEventListener("click", function() {
    todos.push(input.value);
    addtodo(input.value);
    input.value = "";
});

input.addEventListener("keyup", function(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        todos.push(input.value);
        addtodo(input.value);
        input.value = "";
    }
});

function addtodo(todo: string) {
    const cont: HTMLDivElement = document.createElement("div");
    cont.setAttribute("class", "cont-div w-3/4 flex text-center p-2 ms-1/4 z-10");
    cont.innerHTML = `
        <h3 class="inline grow text-2xl text-white z-10">${todo}</h3>
        <button type="button" onclick="dlt(event)" class="text-red-600 grow-0 z-10 font-extrabold">DELETE</button>
    `;
    todolist.appendChild(cont);
    localStorage.setItem('todos', JSON.stringify(todos));
    cont.addEventListener("click", function() {
        cont.style.textDecoration = "line-through";
        remove(todo);
    });
}

function dlt(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const todoItem = target.parentElement!;
    const todoText = todoItem.querySelector('h3')!.textContent!;
    todoItem.remove();
    const index = todos.indexOf(todoText);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

function remove(todo: string) {
    const index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}*/
class TodoApp {
    private button: HTMLElement;
    private todolist: HTMLElement;
    private input: HTMLInputElement;
    private todos: string[];

    constructor() {
        this.button = document.getElementById("add")!;
        this.todolist = document.getElementById("todolist")!;
        this.input = document.getElementById("input")! as HTMLInputElement;
        this.todos = [];

       
    }

     initialize(): void {
        window.onload = () => {
            this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
            this.todos.forEach(todo => this.addTodoElement(todo));
        };

        this.button.addEventListener("click", () => this.addTodoFromInput());
        this.input.addEventListener("keyup", (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                this.addTodoFromInput();
            }
        });
    }

    addTodoFromInput(): void {
        const todo = this.input.value;
        if (todo.trim() !== '') {
            this.todos.push(todo);
            this.addTodoElement(todo);
            this.input.value = "";
            this.updateLocalStorage();
        }
    }

    addTodoElement(todo: string): void {
        const cont: HTMLDivElement = document.createElement("div");
        cont.setAttribute("class", "cont-div w-3/4 flex text-center p-2 ms-1/4 z-10");
        cont.innerHTML = `
            <h3 class="inline grow text-2xl text-white z-10">${todo}</h3>
            <button type="button" class="text-red-600 grow-0 z-10 font-extrabold">DELETE</button>
        `;

        this.todolist.appendChild(cont);
        const deleteButton = cont.querySelector('button')!;
        deleteButton.addEventListener("click", (event) => this.deleteTodoElement(event, todo));
        
        cont.addEventListener("click", () => this.removeTodoElement(todo));
    }

    deleteTodoElement(event: MouseEvent, todo: string): void {
        const target = event.target as HTMLElement;
        const todoItem = target.parentElement!;
        todoItem.remove();

        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }

        this.updateLocalStorage();
    }

    removeTodoElement(todo: string): void {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
        this.updateLocalStorage();
    }

    updateLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}


const todoApp = new TodoApp();
