var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// var id = '595335281e194add0b2c7f3e11';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// } else {
// 	// Todo.find({
// 	// 	_id: id
// 	// }).then((todos) => {
// 	// 	console.log('Todos', todos);
// 	// });

// 	// Todo.findOne({
// 	// 	_id: id
// 	// }).then((todo) => {
// 	// 	console.log('Todo', todo);
// 	// });

// 	Todo.findById(id).then((todo) => {
// 		if (!todo) {
// 			return console.log("ID not found");
// 		};

// 		console.log('Todo by ID', todo);
// 	}).catch((e) => {
// 		console.log(e);
// 	});
// }

var userId = '5951e0d8212e9f8e054c9759';

if (!ObjectID.isValid(userId)) {
	console.log("User ID not valid");
} else {
	// User.find({
	// 	_id: userId
	// }).then((users) => {
	// 	console.log('User', users);
	// });

	// User.findOne({
	// 	_id: userId
	// }).then((users) => {
	// 	console.log("User", users);
	// });

	User.findById(userId).then((user) => {
		if (!user) {
			return console.log("Unable to find user");
		};

		console.log(JSON.stringify(user, undefined, 4));
	}).catch((e) => {
		console.log(e);
	});
}