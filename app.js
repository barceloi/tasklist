// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners

loadEventListeners();

//Load event listeners

function loadEventListeners() {

    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter task events
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from Local Storage

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        //Add a class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // Add a class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}




//Add task

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }
    //Create li element
    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // Add a class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    // Store in lS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task 

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('tai seguro compa?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//REmove from Local Storgage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Clear tasks

function clearTasks() {
    // taskList.innerHTML = ''

    //faster
    while (taskList.firstChild) {  //mientras haya un first hild, o sea, mientras haya algo
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    cleatTasksFromLocalStorage();

}


//Clear Tasks from LS
function cleatTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';

            }

        });


}