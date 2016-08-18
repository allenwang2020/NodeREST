var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var config = require('./web/config/config');
var master = require('./web/master');

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

	var port = config.server_port || 3000
	, ip = config.server_ip || "127.0.0.1";

	var server = http.createServer(master);
	server.listen(port, function() {
	  console.log('Server running on ' + ip+":"+port);
	});
}
