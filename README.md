# ToDoList API

This was created during my time as a student at Code Chrysalis.
This offers API of ToDoList and includes HTML which is Example of use.

## Setup

Install dependencies.
`yarn`
Start service.
`yarn start`
If you need seed data, use this command.
`yarn run knex --knexfile models/knexfile.js seed:run`
Check `http://localhost:3000/todos/`

## API

- `POST /api/todos`
  - It creates todo.
- `GET /api/todos`
  - It returns todo list.
- `GET /api/todos/:id`
  - It returns the todo-item with the given id.
- `PATCH /api/todos/:id`
  - It allow you to edit partial modifications to a todo-item
- `DELETE /api/todos/:id`
  - It delete the given todo-item
