const button: HTMLElement = document.getElementById("add")!;
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
}
