module.exports = (knex, Todo) => {
  return () => {
    return knex("todos")
      .select(Todo.id)
      .then(rows => rows.map(row => new Todo(row)));
  };
};
