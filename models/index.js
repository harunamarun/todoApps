module.exports = function(knex) {
  return {
    todos: require("./todos")(knex)
  };
};
