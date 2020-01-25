const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createTodo = (req, res) =>
    models.todos
      .create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate
      })
      .then(todo => res.status(201).json(todo.serialize()));
  //   .catch(err => {
  //     if (err.message === "That username already exists") {
  //       return models.users
  //         .get({ username: req.body.username })
  //         .then(user => res.status(200).json(user.serialize()));
  //     }

  //     return res.status(400).send(err.message);
  //   });

  const listTodos = (req, res) =>
    models.todos
      .list()
      .then(todos => todos.map(todo => todo.serialize()))
      .then(todos => res.status(200).json(todos))
      .catch(err => res.status(400).send(err.message));

  const getTodo = (req, res) =>
    models.todos
      .get({ id: req.params.id })
      .then(todo => todo.serialize())
      .then(todo => res.status(200).json(todo))
      .catch(err => res.status(400).send(err.message));
  //   const getUserMessages = (req, res) =>
  //     models.userMessages
  //       .list({ toId: req.params.id, fromId: req.query.fromId })
  //       .then((messages) => messages.map((msg) => msg.serialize()))
  //       .then((messages) => res.status(200).json(messages))
  //       .catch((err) => res.status(400).send(err.message));

  //   const createUserMessage = (req, res) =>
  //     models.userMessages
  //       .create({
  //         toId: req.params.id,
  //         fromId: req.body.fromId,
  //         message: req.body.message,
  //       })
  //       .then((messages) => messages.map((msg) => msg.serialize()))
  //       .then((messages) => res.status(200).json(messages))
  //       .catch((err) => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createTodo);
  router.get("/", listTodos);
  router.get("/:id/", getTodo);
  //   router.post("/:id/messages", createUserMessage);

  return router;
};
