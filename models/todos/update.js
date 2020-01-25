const moment = require("moment");

module.exports = (knex, Todo) => {
  return params => {
    const id = params.id;
    const description = params.description;
    const title = params.title;
    const priority = params.priority;
    const dueDate = params.dueDate;
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");

    const updateItem = {};
    if (description !== undefined) updateItem.description = description;
    if (title !== undefined) updateItem.title = title;
    if (priority !== undefined) updateItem.priority = priority;
    if (dueDate !== undefined) updateItem.due_date = dueDate;
    updateItem.updated_at = updatedAt;
    return knex("todos")
      .where({ id })
      .update(updateItem)
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
