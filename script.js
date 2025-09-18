let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong><br/>
        <small>Due: ${task.date} | Priority: ${task.priority} | Category: ${task.category}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="editTask(${index})">✏️</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;

  if (!text) {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text, date, priority, category });
  saveTasks();
  renderTasks();
  
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "Low";
  document.getElementById("category").value = "Work";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

renderTasks();