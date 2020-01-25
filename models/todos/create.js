module.exports = (knex, Todo) => {
  return params => {
    const title = params.title;
    const description = params.description;
    const priority = params.priority;
    const dueDate = params.dueDate;

    return knex("todos")
      .insert({ title, description, priority, due_date: dueDate })
      .then(() => {
        return knex("todos")
          .where({ title })
          .select();
      })
      .then(todos => new Todo(todos.pop()))
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That title already exists"));
        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
