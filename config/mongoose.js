var mongoose = require('mongoose');


module.exports = function(){
    var db = mongoose.connect('mongodb://db:27017/products-demo',function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful : ' + 'mongodb://db:27017/products-demo');
        }
    });
    return db;
};