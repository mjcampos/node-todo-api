var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Unable to connect to MongodDB server");
	};

	console.log("Connected to MongodDB server");

	// db.collection('Todos').insertOne({
	// 	'text': 'Something to do',
	// 	'completed': false
	// }, (err, results) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo', err);
	// 	};

	// 	console.log(JSON.stringify(results.ops, undefined, 4));
	// });

	// db.collection('Users').insertOne({
	// 	'name': 'Davis Herrera',
	// 	'age': 21,
	// 	'location': 'Terrana'
	// }, (err, results) => {
	// 	if (err) {
	// 		return console.log('Unable to insert user', err);
	// 	};

	// 	console.log(JSON.stringify(results.ops[0]._id.getTimestamp(), undefined, 4));
	// });
	
	db.close();
});