/* eslint-disable no-console */
const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("todos", () => {
  describe("##setup##", () => {
    it("able to connect to database", function(done) {
      knex
        .raw("select 1+1 as result")
        .then(() => {
          done();
        })
        .catch(() => {
          assert.fail("unable to connect to db");
          done();
        });
    });
    it("has run the initial migrations", done => {
      knex("todos")
        .select()
        .then(() => {
          done();
        })
        .catch(() => {
          assert.fail("todos table is not found.");
          done();
        });
    });
  });
  describe("##create##", () => {
    let params = { title: " " };
    context("when good params are given", () => {
      before(() => {
        (params.title = "go to the hospital"),
          (params.description = "I should go to the hospital");
      });
      afterEach(() => knex("todos").del());
      it("creates a todo", () =>
        models.todos.create(params).then(todo => {
          expect(todo).to.include({ title: params.title });
          expect(todo).to.include({ description: params.description });
          expect(todo.id).to.be.a("number");
        }));
    });
    context("when a duplicate title is provided", () => {
      beforeEach(() => models.todos.create(params));
      afterEach(() => knex("todos").del());
      it("generates a sanitized error message", () =>
        models.todos
          .create(params)
          .then(forcePromiseReject)
          .catch(err =>
            expect(err.message).to.equal("That title already exists")
          ));
    });
  });
  describe("##list##", () => {
    const titles = ["to do something", "to do homework"];
    const todos = titles.map(title => ({ title }));
    before(() => Promise.all(todos.map(models.todos.create)));
    after(() => knex("todos").del());
    it("lists all todos", () =>
      models.todos.list().then(resp => {
        expect(titles).to.include(resp[0].title);
        expect(titles).to.include(resp[1].title);
      }));
    it("returns serializable objects", () =>
      models.todos.list().then(resp => {
        expect(resp[0].serialize).to.be.a("function");
        expect(resp[0].serialize().id).to.be.a("number");
        expect(resp[0].serialize().title).to.be.a("string");
      }));
  });
  describe("##get##", () => {
    const todos = [
      { title: "to do something", description: "desc1" },
      { title: "to do homework", description: "desc2" }
    ];
    before(() => Promise.all(todos.map(models.todos.create)));
    after(() => knex("todos").del());
    it("get the todo", () => {
      for (const todo of todos) {
        models.todos.get({ title: todo.title }).then(resp => {
          expect(todo.title).to.equal(resp.title);
          expect(todo.description).to.equal(resp.description);
        });
      }
    });
  });

  describe("##update##", () => {
    const todos = [{ title: "to do something", description: "desc1" }];
    const updates = [{ description: "new desc1" }];
    before(() => Promise.all(todos.map(models.todos.create)));
    after(() => knex("todos").del());
    it("update the todo", done => {
      models.todos.list().then(resp => {
        models.todos
          .update({ id: resp[0].id, description: updates[0].description })
          .then(resp => {
            expect(updates[0].description).to.equal(resp.description);
            done();
          });
      });
    });
  });

  describe("##delete##", () => {
    const todos = [{ title: "to do something", description: "desc1" }];
    const updates = [{ description: "new desc1" }];
    before(() => Promise.all(todos.map(models.todos.create)));
    after(() => knex("todos").del());
    it("delete the todo", done => {
      models.todos.list().then(resp => {
        models.todos.delete({ id: resp[0].id }).then(() => {
          models.todos.list().then(resp => {
            expect(0).to.equal(resp.length);
            done();
          });
        });
      });
    });
  });
});
