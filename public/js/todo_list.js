async function showList() {
  const request = await fetch("http://localhost:3000/api/todos");
  const todos = await request.json();
  let latest = todos.length - 1;
  let index = 0;
  while (index <= latest) {
    const post = todos[index];

    const titleEl = document.createElement("div");
    titleEl.className = "title";
    titleEl.innerText = post.title;

    const duedateEl = document.createElement("div");
    duedateEl.className = "duedate";
    duedateEl.innerText = post.dueDate.split(" ")[0];

    const priopiryEl = document.createElement("div");
    priopiryEl.className = "priority";
    priopiryEl.innerText = post.priority;

    const todoCard = document.createElement("a");
    todoCard.setAttribute("href", `/todos/${post.id}`);
    todoCard.appendChild(titleEl);
    todoCard.appendChild(duedateEl);
    todoCard.appendChild(priopiryEl);
    todoCard.className = "todo-card";

    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.className = "todo-delete-btn";
    todoDeleteBtn.innerText = "delete";
    todoDeleteBtn.id = post.id;

    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";
    todoContainer.appendChild(todoCard);
    todoContainer.appendChild(todoDeleteBtn);

    const containerEl = document.getElementById("todo_list");
    containerEl.appendChild(todoContainer);

    index += 1;
  }
}
showList();

async function deleteTodo() {
  fetch(`http://localhost:3000/api/todos/${this.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(() => location.reload())
    .catch(error => console.error(error));
}

async function addTodo() {
  const newPost = {
    title: document.getElementById("title-text").value,
    description: document.getElementById("description-text").value,
    dueDate: document.getElementById("due-date").value,
    priority: document.getElementById("priority-select").value
  };
  fetch(`http://localhost:3000/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(newPost)
  })
    .then(() => location.reload())
    .then(response => response.json())
    .then(data => JSON.stringify(data))
    .catch(error => console.error(error));
}

window.onload = () => {
  let postBtn = document.getElementById("post-btn");
  postBtn.addEventListener("click", addTodo);
  let deleteBtns = document.getElementsByClassName("todo-delete-btn");
  for (const btn of deleteBtns) {
    btn.addEventListener("click", deleteTodo);
  }
};
