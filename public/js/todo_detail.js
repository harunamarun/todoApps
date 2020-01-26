console.log("location.pathname", location.pathname);
const patharr = location.pathname.split("/");
const todoId = patharr[patharr.length - 1];

async function getTodo() {
  const request = await fetch(`http://localhost:3000/api/todos/${todoId}`);
  const todo = await request.json();
  document.getElementById("title-text").value = todo.title;
  document.getElementById("description-text").value = todo.description;
  document.getElementById("due-date").value = todo.dueDate.split(" ")[0];
  document.getElementById("priority-select").value + todo.priority;
}
getTodo();

async function saveTodo() {
  const newPost = {
    title: document.getElementById("title-text").value,
    description: document.getElementById("description-text").value,
    dueDate: document.getElementById("due-date").value,
    priority: document.getElementById("priority-select").value
  };
  fetch(`http://localhost:3000/api/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(newPost)
  })
    .then(() => (window.location.href = "/todos"))
    .catch(error => console.error(error));
}

window.onload = () => {
  let saveBtn = document.getElementById("save-btn");
  saveBtn.addEventListener("click", saveTodo);
};
