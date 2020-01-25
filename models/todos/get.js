module.exports = (knex, Todo) => {
  return params => {
    const id = params.id;
    const title = params.title;
    const filter = {};
    if (id !== undefined) filter.id = id;
    if (title !== undefined) filter.title = title;

    return knex("todos")
      .where(filter)
      .select()
      .then(todos => {
        if (todos.length) return new Todo(todos.pop());
        throw new Error(`Error finding todo ${id}`);
      });
  };
};
