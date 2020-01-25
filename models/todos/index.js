const moment = require("moment");

const Todo = function(dbTodo) {
  this.id = dbTodo.id;
  this.title = dbTodo.title;
  this.description = dbTodo.description;
  this.priority = dbTodo.priority;
  this.dueDate = new Date(dbTodo.due_date);
  this.updatedAt = new Date(dbTodo.updated_at);
};

Todo.prototype.serialize = function() {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    priority: this.priority,
    dueDate: moment(this.dueDate).format("YYYY-MM-DD hh:mm:ss"),
    updatedAt: moment(this.updatedAt).format("YYYY-MM-DD hh:mm:ss")
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Todo),
    list: require("./list")(knex, Todo),
    get: require("./get")(knex, Todo),
    update: require("./update")(knex, Todo),
    delete: require("./delete")(knex, Todo)
  };
};
