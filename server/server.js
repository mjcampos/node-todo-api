var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static('views'));

app.get('/', (req, res) => {
	res.redirect('/todos');
})

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		// res.send({todos});
		res.render('index.hbs', {todos});
	}, (e) => {
		res.status(400).send(e);
	});

});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	};

	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		};

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

var port = 8888;

app.listen(port, () => {
	console.log("Starting server at port " + port);
});

module.exports = {
	app
};