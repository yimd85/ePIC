var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
var passport = require('passport');
const saltRounds = 10;

//logon page
router.get('/login',function(request,response){
          response.render('login-page.pug');
});


router.post('/login', passport.authenticate('local',{
  successRedirect: '/home',
  failureRedirect: '/login'
}));



router.get('/signup',function(request,response){
          response.render('sign-up.pug');
});


router.post('/signup',function(request,response){
      User.findAll().then(function(){
          var hash = bcrypt.hashSync(request.body.password, saltRounds);
            User.create({
              email: request.body.email,
              firstname: request.body.firstname,
              lastname: request.body.lastname,
              password: hash
            }).then(function(results) {
              const user_identifier = results.email;
                response.redirect('/login');
            });
          })
});



router.get('/logout', function(request, response) {


     request.session.destroy(function(err) {
         if(err){throw err}
         response.render('login-page.pug');

     });

});



passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });


passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  });




module.exports = router;
