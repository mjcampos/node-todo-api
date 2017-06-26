// var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Unable to connect to MongodDB server");
	};

	console.log("Connected to MongodDB server");

	// deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
	// 	console.log(res);
	// });

	// deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
	// 	console.log(res);
	// });

	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
	// 	console.log(res);
	// });

	// db.collection('Users').deleteMany({name: 'Davis Herrera'});

	db.collection('Users').findOneAndDelete({_id: new ObjectID('59509c1b03a2d0c6c532a8b1')}).then((res) => {
		console.log(JSON.stringify(res, undefined, 4));
	});

	// db.close();
});