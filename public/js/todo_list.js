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

    const containerEl = document.getElementById("todo_list");
    const todoEl = document.createElement("div");
    todoEl.className = "todo";
    containerEl.appendChild(todoEl);
    todoEl.appendChild(titleEl);
    todoEl.appendChild(duedateEl);
    todoEl.appendChild(priopiryEl);

    index += 1;
  }
}
showList();
