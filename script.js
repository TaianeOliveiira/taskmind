let tasks = [];

function loadTasks() {
  let data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let name = document.getElementById("taskInput").value;
  let date = document.getElementById("taskDate").value;
  let priority = document.getElementById("priority").value;

  if (name === "" || date === "") {
    alert("Preencha todos os campos!");
    return;
  }

  let task = {
    name,
    date,
    priority,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

function completeTask(index) {
  tasks[index].done = true;
  saveTasks();
  renderTasks();
}

function updatePriority() {
  let today = new Date();

  tasks.forEach(task => {
    let taskDate = new Date(task.date);
    let diff = (taskDate - today) / (1000 * 60 * 60 * 24);

    if (diff <= 1) {
      task.priority = "alta";
    } else if (diff <= 3) {
      task.priority = "media";
    }
  });
}

function checkLateTasks() {
  let today = new Date();
  let late = tasks.filter(task => new Date(task.date) < today && !task.done);

  if (late.length > 0) {
    alert(`Você tem ${late.length} tarefas atrasadas!`);
  }
}

function suggestTask() {
  let pending = tasks.filter(t => !t.done);

  pending.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  if (pending.length > 0) {
    alert("Sugestão: comece por -> " + pending[0].name);
  } else {
    alert("Nenhuma tarefa pendente 🎉");
  }
}

function renderTasks() {
  updatePriority();

  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.classList.add(`priority-${task.priority}`);

    if (task.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
      <span>${task.name} (${task.date})</span>
      <button onclick="completeTask(${index})">✔</button>
    `;

    list.appendChild(li);
  });
}

// iniciar sistema
loadTasks();
renderTasks();
checkLateTasks();