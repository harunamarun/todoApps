# ToDoList API

This was created during my time as a student at Code Chrysalis.<br>
This offers API of ToDoList and includes HTML which is Example of use.

## Setup

Install dependencies.<br>
`yarn`<br>
Start service.<br>
`yarn start`<br>
If you need seed data, use this command.<br>
`yarn run knex --knexfile models/knexfile.js seed:run`<br>
Check<br>
`http://localhost:3000/todos/`

## API

### POST /api/todos

Creates todo.

request params

```
{
  title: 'newtitle3',
  description: 'newtitle888',
  priority: 'low',
  due_date: 2020-12-30T02:11:12.000Z,
}
```

responce (created todo item)

```
{
  id: 93,
  title: 'newtitle3',
  description: 'newtitle888',
  priority: 'low',
  due_date: 2020-12-30T02:11:12.000Z,
  updated_at: 2020-01-26T01:03:20.000Z
}
```

### GET /api/todos

Returns todo list.

responce (list of todo item)

```
[{
  id: 93,
  title: 'newtitle3',
  description: 'newtitle888',
  priority: 'low',
  due_date: 2020-12-30T02:11:12.000Z,
  updated_at: 2020-01-26T01:03:20.000Z
},
{....}
]
```

### GET /api/todos/:id

Returns the todo-item with the given id.

responce

```
{
  id: 93,
  title: 'newtitle3',
  description: 'newtitle888',
  priority: 'low',
  due_date: 2020-12-30T02:11:12.000Z,
  updated_at: 2020-01-26T01:03:20.000Z
}
```

### PATCH /api/todos/:id

Update todo-item

request params

```
{
  title: 'newtitle3',
  description: 'newtitle888',
  priority: 'low',
  due_date: 2020-12-30T02:11:12.000Z,
}
```

responce (updated todo item)

```
{
  id: 93,
  title: 'newtitle3',
  description: 'newtitle888',
  priority: 'low',
  due_date: 2020-12-30T02:11:12.000Z,
  updated_at: 2020-01-26T01:03:20.000Z
}
```

### DELETE /api/todos/:id

Delete todo-item

responce (result of operation)

```
"OK"
```

## DB

DB name: todoapp<br>
TABLE name: todos<br>
Table schema:<br>

```
id :int(unique)
title :string
description :text
priority :enum (low, middle, high)
dueDate :date
updatedAt :date
```
