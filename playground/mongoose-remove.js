var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.remove
// Todo.remove({}).then((res) => {
// 	console.log(res);
// });

// Todo.findOneAndRemove({})

Todo.findByIdAndRemove('5959dfd62f6e49066bc9efd1').then((todo) => {
	console.log(todo);
});