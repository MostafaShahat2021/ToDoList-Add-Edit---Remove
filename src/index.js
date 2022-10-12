import './style.css';

// const input = document.getElementById('task');
const submit = document.querySelector('.add-btn');
const tasksDiv = document.querySelector('.tasks');
const taskInput = document.querySelector('.add-task input');
// console.log(taskInput);
let editId;
let isEditTask = false;
let tasks = JSON.parse(localStorage.getItem('task-list'));

window.editTask = (taskId, taskDescripton) => {
  // console.log(taskId, taskDescripton);
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskDescripton;
};
// editTask();

const addElemToPage = () => {
  let div = '';
  if (tasks) {
    tasks.forEach((task, index) => {
      div += `
      <div class='task' data-id='task.id'>
        <input id="${index}" class='checkbox' onclick='updateCompleted(this)' type="checkbox">
        <p id='${index}'class='text' contenteditable="false">${task.descripton}</p>
        <button type="button"  id="${index}" class='edit' >
        <span onclick='editTask(${index}, "${task.descripton}")' class="material-symbols-outlined">edit</span>
        </button>
        <button type="button"  id="${index}" class='del' onclick='del(${index})' >
        <span class='material-symbols-outlined del'>delete</span>
        </button>
        </div>
      `;
    });
  }
  tasksDiv.innerHTML = div;
};
addElemToPage();

submit.addEventListener('click', () => {
  const userTask = taskInput.value;
  if (!isEditTask) {
    if (!tasks) {
      tasks = [];
    }
    const task = {
      id: Date.now(),
      descripton: userTask,
      completed: false,
    };
    tasks.push(task);
  } else {
    isEditTask = false;
    tasks[editId].descripton = userTask;
  }
  taskInput.value = '';
  localStorage.setItem('task-list', JSON.stringify(tasks));
  addElemToPage();
});

taskInput.addEventListener('keyup', (e) => {
  const userTask = taskInput.value;
  if (e.key === 'Enter' && userTask) {
    if (!isEditTask) {
      if (!tasks) {
        tasks = [];
      }
      const task = {
        id: Date.now(),
        descripton: userTask,
        completed: false,
      };
      tasks.push(task);
    } else {
      isEditTask = false;
      tasks[editId].descripton = userTask;
    }
    taskInput.value = '';
    localStorage.setItem('task-list', JSON.stringify(tasks));
    addElemToPage();
  }
});

window.del = (deletId) => {
  tasks.splice(deletId, 1);
  // save updated todos to local storage
  localStorage.setItem('task-list', JSON.stringify(tasks));
  addElemToPage();
};
// del();