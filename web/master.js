   // Dependencies
	var http = require('http');
	var express = require('express');
	var bodyParser = require('body-parser');
	var config = require('./conf/conf');


	// MongoDB
	var Mongoose = require('./conf/mongoose');
	var db =  new Mongoose();
	

	// Express
	var app = express();

	app.use(express.static(__dirname + '/public'));

	app.set('superSecret', config.sessionSecret); // secret variable

	//use body parser so we can get info from POST and/or URL parameters
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));


	// Routes
	app.use('/api', require('./routes/api'));

	module.exports = app;
	
	