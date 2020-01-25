module.exports = (knex, Todo) => {
  return params => {
    const id = params.id;
    const description = params.description;
    return knex("todos")
      .where({ id })
      .update({
        description
      })
      .then(() => {
        return knex("todos")
          .where({ id })
          .select();
      })
      .then(todos => new Todo(todos.pop()))
      .catch(err => {
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That todo already exists"));
        return Promise.reject(err);
      });
  };
};
