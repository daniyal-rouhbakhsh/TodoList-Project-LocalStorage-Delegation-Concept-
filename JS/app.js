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
        setLocalStorageData(todosArray)
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

const setLocalStorageData = todosArray => {
    localStorage.setItem('Todos',JSON.stringify(todosArray))
}

const getLocalStorageDataFunc = () => {
    let getLocalStorageData = JSON.parse(localStorage.getItem('Todos')) || []
    todosArray = getLocalStorageData

    todoDOMGenerator(todosArray)
}

const changeTodoBackgroundColor = e => {
    colorItem = e.target.dataset.color 
    input.style.backgroundColor = colorItem
    input.focus()
}

const removeTodoFunc = e => {
    const todoDiv = e.target.closest('.todo-item')
    const divID = parseInt(todoDiv.id)
    
    todosArray = todosArray.filter(todo => todo.todoId !== divID)
    
    todoDOMGenerator(todosArray)
    setLocalStorageData(todosArray)
}

const clearInputFunc = () => {
    input.value = ""
    input.focus()
    input.style.backgroundColor = '#fff'
    colorItem = "#fff"
}


addTodoBtn.addEventListener('click', addTodoFunc)
editTodoBtn.addEventListener('click', clearInputFunc)
colorContainer.addEventListener('click',changeTodoBackgroundColor)
todoContainer.addEventListener('dblclick',removeTodoFunc,true)
window.addEventListener('load',getLocalStorageDataFunc)
input.addEventListener('keyup', e => {
    if(e.code === 'Enter'){
        addTodoFunc()
    }
})