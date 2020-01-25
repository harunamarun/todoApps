exports.up = function(knex, Promise) {
  return knex.schema.createTable("todos", t => {
    t.increments().index();

    t.string("title", 30)
      .unique()
      .notNullable();

    t.text("description");

    t.enu("priority", ["low", "middle", "high"]).index();

    t.timestamp("due_date").index();

    t.timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("todos");
};
