var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function(){
    var db = mongoose.connect('mongodb://localhost:27017/products-demo',function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful : ' + 'mongodb://localhost:27017/products-demo');
        }
    });
    return db;
};