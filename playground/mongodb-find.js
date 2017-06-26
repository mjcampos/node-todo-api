// var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Unable to connect to MongodDB server");
	};

	console.log("Connected to MongodDB server");

	// db.collection('Todos').find({
	// 	_id: new ObjectID('594f1fa74f121409733a8c99')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 4));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log('Todos count: ' + count);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	db.collection('Users').find({name: 'Davis Herrera'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 4));
	});
	
	// db.close();
});