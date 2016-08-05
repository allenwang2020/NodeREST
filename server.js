
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
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

//use morgan to log requests to the console
app.use(morgan('dev'));

var logger = require('morgan');
var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')
var logDirectory = __dirname + '/logs'

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
})
// setup the logger
app.use(logger('combined', {stream: accessLogStream}))


// Routes
app.use('/api', require('./routes/api'));

// Start server

var port = config.server_port || 8080
, ip = config.server_ip || "127.0.0.1";
app.listen(port, ip, function() {
  console.log('Express server listening on %d', port);
});
