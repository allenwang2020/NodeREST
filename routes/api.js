
// Dependencies
var jwt    = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

//route to return all products (GET http://localhost:8080/api/products)
//Product
var Product = require('../models/product');
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

//route to return all users (GET http://localhost:8080/api/users)
//User
var User = require('../models/user');
User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/users');

//create a new user account (POST http://localhost:8080/api/signup)
router.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      admin:false
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});




//route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

 
//getToken = function (headers) {
//  if (headers && headers.authorization) {
//    var parted = headers.authorization.split(' ');
//    if (parted.length === 2) {
//      return parted[1];
//    } else {
//      return null;
//    }
//  } else {
//    return null;
//  }
//};




router.use(function(req, res, next) {

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;    
	        next();
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
	});

//
//router.get('/setup', function(req, res) {
//
//	  // create a sample user
//	  var nick = new User({ 
//	    name: 'Nick Cerminara', 
//	    password: 'password',
//	    admin: true 
//	  });
//
//	  // save the sample user
//	  nick.save(function(err) {
//	    if (err) throw err;
//
//	    console.log('User saved successfully');
//	    res.json({ success: true });
//	  });
//	});

// Return router
module.exports = router;
