// var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Unable to connect to MongodDB server");
	};

	console.log("Connected to MongodDB server");

	// findOneAndUpdate
	// db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5950995d03a2d0c6c532a8b0')}, {
	// 	$set: {
	// 		'completed': true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((res) => {
	// 	console.log(res);
	// });

	db.collection('Users').findOneAndUpdate({_id: new ObjectID('5950455ae8274d049d1afb3b')}, {
		$inc: {
			'age': 1
		},
		$set: {
			'name': 'Octavia Blake'
		}
	}, {
		returnOriginal: false
	}).then((res) => {
		console.log(res)
	});

	// db.close();
});