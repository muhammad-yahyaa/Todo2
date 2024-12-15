var button =document.getElementById("add")
var todolist =document.getElementById("todolist")
var input =document.getElementById("input")

var todos=[];

window.onload=function(){
    todos=JSON.parse(localStorage.getItem('todos')) || []
    todos.forEach(todo => addtodo(todo))
   
}


button.addEventListener("click",function(){
    todos.push(input.value)
    addtodo(input.value)
    input.value=""
})



input.addEventListener("keyup",function(event){
    if(event.key == 'Enter'){
        todos.push(input.value)
        addtodo(input.value)
        input.value=""
    }
})

function addtodo(todo){
    var cont =  document.createElement("div")
    cont.setAttribute("class","cont-div w-3/4 flex text-center p-2 ms-1/4 z-10 ")
     cont.innerHTML =`
     <h3 for ="${input}" class="inline grow text-2xl text-white z-10">${input.value}</h3>
     <button type="button" onclick="dlt(event)" class="text-red-600 grow-0 z-10">DELETE</button>
     `
     todolist.appendChild(cont)
     localStorage.setItem('todos',JSON.stringify(todos))
     cont.addEventListener("click",function(){
         cont.style.textDecoration ="line-through"
         remove(todo)
     })
 }

 function dlt(event){
    event.target.parentElement.remove()
    var index=todos.indexOf(event.target)
    if(index>-1){
        todos.splice(index,1)
    }
    localStorage.setItem('todos',JSON.stringify(todos))

 }

 function remove(todo){
    var index=todos.indexOf(todo)
    if(index>-1){
        todos.splice(index,1)
    }
    localStorage.setItem('todos',JSON.stringify(todos))
 }

