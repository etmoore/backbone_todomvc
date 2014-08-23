var app = app || {};

var TodoList = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: app.Todo,

  // Save all of the todo items under the "todos-backbone" namespace.
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  completed: function() {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  },

  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function(todo) {
    return todo.get('order');
  }
});

// Create our global collection of **Todos**
app.Todos = new TodoList();