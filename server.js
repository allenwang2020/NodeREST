
// Dependencies
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');


// MongoDB
var Mongoose = require('./config/mongoose');
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

// Start server

var port = config.server_port || 8080
, ip = config.server_ip || "127.0.0.1";


var server = http.createServer(app);
server.listen(port, function() {
  console.log('Server running on ' + ip+":"+port);
});
