var {ObjectID} = require('mongodb');
var jwt = require('jsonwebtoken');
var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

var users = [{
	_id: userOneId,
	email: 'camposmj89@gmail.com',
	password: 'asdfasdf',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email: 'dherrera@gmail.com',
	password: 'asdfasdf2',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
	}]
}];

var todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	_creator: userOneId
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333,
	_creator: userTwoId
}];

var populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() => done());
};

var populateUser = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo])
	}).then(() => {
		done();
	});
};

module.exports = {
	todos,
	populateTodos,
	users,
	populateUser
};