module.exports = (knex, Todo) => {
  return params => {
    const id = params.id;

    return knex("todos")
      .where({ id })
      .select()
      .then(todos => {
        if (todos.length) return new Todo(todos.pop());
        throw new Error(`Error finding todo ${id}`);
      });
  };
};
