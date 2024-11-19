const input = document.getElementById('input')
const editTodoBtn = document.getElementById('edit-todo')
const addTodoBtn = document.getElementById('add-todo')
const todoContainer = document.querySelector('.todo-container')
const colorContainer = document.querySelector('.color-container')
let todosArray = []
let colorItem = "#fff"

const addTodoFunc = () => {
    let inputValue = input.value.trim()

    if(inputValue.length !== 0){
        let todoObj = {
            todoId: Date.now(),
            todoText: inputValue,
            todoBackgroundColor: colorItem
        }
        
        todosArray.push(todoObj)
        todoDOMGenerator(todosArray)
    }

    clearInputFunc()
}

const todoDOMGenerator = todosArray => {
    todoContainer.innerHTML = ""

    todosArray.forEach( todo => {
        let newTodo = document.createElement('div')
        newTodo.className = 'todo-item'
        newTodo.id = todo.todoId
        newTodo.style.backgroundColor = todo.todoBackgroundColor

        let todoText = document.createElement('h6')
        todoText.className = 'todo-text'
        todoText.innerHTML = todo.todoText

        newTodo.append(todoText)
        todoContainer.append(newTodo)
    });
}


const clearInputFunc = () => {
    input.value = ""
    input.focus()
    input.style.backgroundColor = '#fff'
    colorItem = "#fff"
}


addTodoBtn.addEventListener('click', addTodoFunc)
editTodoBtn.addEventListener('click', clearInputFunc)
input.addEventListener('keyup', e => {
    if(e.code === 'Enter'){
        addTodoFunc()
    }
})