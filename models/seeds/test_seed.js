exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        {
          title: "title1",
          description: "description1",
          priority: "middle",
          due_date: "2020-02-11 02:11:11"
        },
        {
          title: "title2",
          description: "description2",
          priority: "high",
          due_date: "2020-02-12 02:11:11"
        },
        {
          title: "title3",
          description: "description3",
          priority: "low",
          due_date: "2020-02-13 02:11:11"
        }
      ]);
    });
};
