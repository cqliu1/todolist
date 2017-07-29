// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
// var orm = require("../config/orm.js");

// reference sequelize
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    // orm.getTodos(function(results) {
    //   res.json(results);
    // });
    console.log("Getting all todos...");
    db.Todo.findAll().then(todos => {
      res.json(todos);
    });
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {
    // orm.addTodo(req.body, function(results) {
    //   res.json(results).status(200);
    // });
    console.log("Inserting todo...");
    let newTodo = req.body;
    console.log("Request:",newTodo);
    db.Todo.create({
      text: newTodo.text,
      complete: newTodo.complete
    }).then(dbTodo => {
      console.log("Added new todo.");
      res.json(dbTodo);
    });
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // orm.deleteTodo(req.params.id, function(results) {
    //   res.json(results).status(200);
    // });
    console.log("Deleting todo...");
    let id = req.params.id;
    db.Todo.destroy({
      where: {
        id:id
      }
    }).then(dbTodo => {
      console.log("Deleted todo with id:",id);
      res.json(dbTodo);
    });
  });


  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/todos", function(req, res) {
    // orm.editTodo(req.body, function(results) {
    //   res.json(results).status(200);
    // });
    console.log("Updating todo...");
    let updatedTodo = req.body;

    db.Todo.update({
      text: updatedTodo.text,
      complete: updatedTodo.complete
    },{
      where: {
        id: updatedTodo.id
      }
    }).then(todos => {
      console.log("Updated todo with id:",updatedTodo.id);
      res.json(todos);
    });

  });
};
