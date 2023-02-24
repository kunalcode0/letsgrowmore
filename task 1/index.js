const myForm = document.getElementById("my-form");
const inputBox = document.getElementById("input-box");
const descriptionBox = document.getElementById("description-box");
const taskList = document.getElementById("task-list");

// Assuming your are handling this function
function Id() {
  const uid =
    new Date().toISOString().replaceAll(/[-:TZ]/g, ".") +
    Math.random().toString().substring(2, 7);
  return uid.split(".").join("");
}

window.onload = function () {
 
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(({ id, title }) => {
    const task = renderTasks(id, title);
    taskList.append(task);
  });
};

// Reusable function to render the tasks.
function renderTasks(id, title) {
  const taskParent = document.createElement("div");
  taskParent.className = 'card';

  taskParent.id = id;


  const title2 = document.createElement("p");
  title2.className = 'p-1';
  title2.innerText = "Task";

  const taskTitle = document.createElement("p");
  taskTitle.className = 'p-2';
  taskTitle.innerText = title;
  
  // You don't need to set Id's in your case. You can just assign a
  // function to the delete button and remove the parent within the
  // functon itself
  const deleteButton = document.createElement("button");
  deleteButton.className = 'dlt-btn';
  deleteButton.innerText = "DELETE";
  deleteButton.onclick = function () {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    taskParent.remove();

    // Array filter. Return a new list without the deleted task
    const newTaskList = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };

  // I'm using append because with appendChild you can't append more than
  // 2 html elements at the same time
  taskParent.append(title2,taskTitle, deleteButton);

  return taskParent;
}

// 1. render the task
// 2. Append the task to the list
// 3. Set the title in the localStorage
myForm.onsubmit = function (e) {
  e.preventDefault();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const id = Id();

  const title = inputBox.value;
  const task = renderTasks(id, title);
  taskList.append(task);

  localStorage.setItem(
    "tasks",
    JSON.stringify([...tasks, { id, title }])
  );
};