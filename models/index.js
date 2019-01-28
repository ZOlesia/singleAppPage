const mongoose = require('mongoose');


mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-api');

module.exports.Todo = require('./todo');