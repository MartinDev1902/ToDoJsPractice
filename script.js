var $addTaskButton = document.querySelector('#addTask');
var $inputTask = document.querySelector('#inputTask');
var $emptyaTaskListMessage = document.querySelector('#emptyTaskList')
var $taskList = document.querySelector('#todoItems');
var $showAllTasks = document.querySelector('#showAllTasks')
var $showActiveTasks = document.querySelector('#showActiveTasks')
var $showCompletedTasks = document.querySelector('#showCompletedTasks')
var $clearCompleted = document.querySelector('#clearCompleted')

var tasks = JSON.parse(localStorage.getItem('tasks'))

    if(tasks === null ){
         localStorage.setItem('tasks', '[]') 
         tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    if(tasks.length === 0 || tasks === null){
        show($emptyaTaskListMessage)
    } else{
        renderTasks()
    }

$addTaskButton.addEventListener('click', createTask);
$taskList.addEventListener('click', controllTask)
$showAllTasks.addEventListener('click', renderTasks)
$showActiveTasks.addEventListener('click', renderActiveTasks)
$showCompletedTasks.addEventListener('click', renderCompletedTasks)
$clearCompleted.addEventListener('click', clearCompleted)

function clearCompleted(){
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].completed){
            var taskIndex = tasks.indexOf(tasks[i])
            tasks.splice(taskIndex, 1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks();
}

function controllTask(event){
    if(event.target.dataset.remove){  
        var foundTask = tasks.find(function(task){
            if(task.id === parseInt(event.target.parentNode.dataset.id)) return task;
        })
        var taskIndex = tasks.indexOf(foundTask)
        tasks.splice(taskIndex, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks()
        if(tasks.length === 0 ){ show($emptyaTaskListMessage) }
    }

    if(event.target.dataset.check){
        var foundTask =  tasks.find(function(task){    
            if(task.id === parseInt(event.target.parentNode.parentNode.dataset.id)){ return task; }   
        })
        var taskIndex = tasks.indexOf(foundTask)
        tasks[taskIndex].completed = !foundTask.completed
        localStorage.setItem('tasks', JSON.stringify(tasks)) 
    }   
}

function createTask(){
    var taskContent = $inputTask.value;
    if(taskContent !== ''){
        var task = { id: createId(), content: taskContent, completed: false }
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks()
        if(tasks.length !== 0 ) hide($emptyaTaskListMessage)
        $inputTask.value = ''
    }else{
         alert('Write your task')
    }
}

function show($el){ $el.classList.remove('hide') }
function hide($el){ $el.classList.add('hide') }

function renderCompletedTasks(){
    $taskList.innerHTML = ''
    var completedTask = []
    tasks.map(function(element){
        if(element.completed){
            completedTask.push(element)
            showTemplate(element)
            $taskList.insertAdjacentHTML('beforeend',showTemplate(element))
        }
    })
    if(completedTask.length === 0) {
        show($emptyaTaskListMessage)
    }else{
        hide($emptyaTaskListMessage)
    }
}

function renderActiveTasks(){
    $taskList.innerHTML = ''
    var activeTask = []
    tasks.map(function(element){
        if(!element.completed){
            showTemplate(element)
            activeTask.push(element)
            $taskList.insertAdjacentHTML('beforeend',showTemplate(element))
        }
    })
    if(activeTask.length === 0) {
        show($emptyaTaskListMessage)
    }else{
        hide($emptyaTaskListMessage)
    }
}

function renderTasks(){
    if(tasks.length === 0)  {
        show($emptyaTaskListMessage)
    }else{
        hide($emptyaTaskListMessage)
        $taskList.innerHTML = '';
        tasks.map(function(element){ $taskList.insertAdjacentHTML('beforeend', showTemplate(element))})
    }
}

function showTemplate(element){
    return `<div  class="todo-element" data-id="${element.id}">
                <div class="checkbox">
                    <input aria-checked="${element.completed}" ${element.completed ? 'checked' : ''} data-id="${element.id}" type="checkbox" data-check="true" >
                </div>
                <div class="todo-element-content">${element.content}</div>
                    <img data-remove="true" class="remove-element" src="img/icon-cross.svg"/>
            </div>`
}

function createId(){ return Math.floor(Math.random() * (1898719187 - 1) + 1 * Date.now()) }