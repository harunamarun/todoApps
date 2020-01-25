module.exports = (knex, Todo) => {
  return params => {
    const id = params.id;
    const description = params.description;
    console.log("des:", description);
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
      .then(todos => new Todo(todos.pop())) // create a user model out of the plain database response
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That todo already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
