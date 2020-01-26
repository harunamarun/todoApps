async function showList() {
  const request = await fetch("http://localhost:3000/api/todos");
  const todos = await request.json();
}
showList();
