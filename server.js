var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork启一个Worker 进程
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('listening',function(worker, address){
    console.log('worker ' + worker.process.pid +', listen: '+address.address+":"+address.port);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    //重启一个worker进程
    cluster.fork();
  });
} else {
  // Worker 进程之间可以共享任何形式的TCP连接
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

	var port = config.server_port || 3000
	, ip = config.server_ip || "127.0.0.1";


	var server = http.createServer(app);
	server.listen(port, function() {
	  console.log('Server running on ' + ip+":"+port);
	});
}
