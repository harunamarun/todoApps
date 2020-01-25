const moment = require("moment");

const Todo = function(dbTodo) {
  this.id = dbTodo.id;
  this.title = dbTodo.title;
  this.description = dbTodo.description;
  this.priority = dbTodo.priority;
  this.dueDate = new Date(dbTodo.due_date);
  this.createdAt = new Date(dbTodo.created_at);
};

Todo.prototype.serialize = function() {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    priority: this.priority,
    dueDate: moment(this.dueDate).format("hh:mm:ss"),
    createdAt: moment(this.createdAt).format("hh:mm:ss")
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Todo),
    list: require("./list")(knex, Todo)
    //    get: require("./get")(knex, Todo)
  };
};
