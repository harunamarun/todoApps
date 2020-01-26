console.log("location.pathname", location.pathname);
const patharr = location.pathname.split("/");
const todoId = patharr[patharr.length - 1];
async function getTodo() {
  const request = await fetch(`http://localhost:3000/api/todos/${todoId}`);
  const jsons = await request.json();
  console.log("jsons", jsons);
}
getTodo();
