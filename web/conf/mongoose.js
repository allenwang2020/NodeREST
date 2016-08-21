var mongoose = require('mongoose');
var options = {
		  db: { native_parser: true },
		  server: { poolSize: 5 },
		  user: 'admin',
		  pass: '12345'
		};
	
mongoose.Promise = global.Promise;

module.exports = function(){
    var db = mongoose.connect('mongodb://db-mongo:27017/products-demo',options,function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful : ' + 'mongodb://db-mongo:27017/products-demo');
        }
    });
    return db;
};