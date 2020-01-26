exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        {
          title: "Survive CodeChrysalis",
          description: "write code, write code, write code!!",
          priority: "high",
          due_date: "2020-03-27 02:11:11"
        },
        {
          title: "Get job",
          description: "get gooooood job!",
          priority: "high",
          due_date: "2020-04-30 02:11:11"
        },
        {
          title: "Earn money",
          description: "Earn money for good life.",
          priority: "high",
          due_date: "2020-05-31 02:11:11"
        }
      ]);
    });
};
