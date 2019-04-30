const express=require('express');
const app = express();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const blogsRouter = require('./blog-post-router');

app.use('/blogs/api', jsonParser, blogsRouter);

app.use(express.static('public'));

let server;

function runServer(port, databaseUrl) {
	//Promise is similar to an AJAX call
	return new Promise( (resolve, reject) => {
		mongoose.connect(databaseUrl,
				err => {
					if (err) {
						return reject(err);
					}
					else {
						server = app.listen(port, () => {
							console.log("Your app is running in port ", port);
							resolve();
						})
						.on("error", err => {
							mongoose.disconnect();
							return reject(err);
						});
					}
				}
			)
	});
}

function closeServer() {
	return mongoose.disconnect()
		.then ( () => {
			return new Promise( (resolve, reject) => {
				console.log("Closing the server");
				server.close( err => {
					if (err) {
						return reject(err);
					}
					else {
						resolve();
					}
				});
			});
		});
}

runServer(8080, "mongodb://localhost/jesus-blog-post")
	.catch(err => console.log(err));

module.exports = {app, runServer, closeServer};