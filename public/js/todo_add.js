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
    .then(response => response.json())
    .then(data => JSON.stringify(data))
    .catch(error => console.error(error));
}

window.onload = () => {
  let postBtn = document.getElementById("post-btn");
  postBtn.addEventListener("click", addTodo);
};
