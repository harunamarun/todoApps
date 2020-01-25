module.exports = (knex, Todo) => {
  return params => {
    const id = params.id;

    return knex("todos")
      .where({ id })
      .del();
  };
};
