require('./config/config.js');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static('views'));

app.get('/', (req, res) => {
	res.redirect('/todos');
})

app.post('/todos', authenticate, (req, res) => {
	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({todos});
		// res.render('index.hbs', {todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

// GET /todos/:id
app.get('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

// DELETE /todos/:id
app.delete('/todos/:id', authenticate, async (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	};

	try {
		var todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id
		});

		if (!todo) {
			return res.status(404).send();
		};

		res.send({todo});
	} catch (e) {
		res.status(400).send();
	}
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, async (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	try {
		var todo = await Todo.findOneAndUpdate({
			_id: id,
			_creator: req.user._id
		}, {
			$set: body
		}, {
			new: true
		});

		if (!todo) {
			return res.status(404).send();
		};

		res.send({todo});
	} catch (e) {
		res.status(400).send();
	}
});

// POST /users
app.post('/users', async (req, res) => {
	try {
		var body = _.pick(req.body, ['email', 'password']);
		var user = new User(body);

		await user.save()

		var token = await user.generateAuthToken();

		res.header('x-auth', token).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
	try {
		var body = _.pick(req.body, ['email', 'password']);
		var user = await User.findByCredentials(body.email, body.password);
		var token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch(e) {
		res.status(400).send();
	}
});

app.delete('/users/me/token', authenticate, async (req, res) => {
	try {
		await req.user.removeToken(req.token);
		res.status(200).send();
	} catch (e) {
		res.status(400).send();
	}
});

var port = 8888;

app.listen(port, () => {
	console.log("Starting server at port " + port);
});

module.exports = {
	app
};