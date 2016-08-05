
// Dependencies
var bcrypt = require('bcrypt');
var restful = require('node-restful');
var mongoose = restful.mongoose;

 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
//Schema
var UserSchema = new mongoose.Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
   admin: Boolean
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

//Return model
module.exports = restful.model('Users', UserSchema);