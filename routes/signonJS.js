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


router.post('/login',function(request,response){
          var emailMe = request.body.email;
          // // var password = bcrypt.hashSync(request.body.password, saltRounds);
          // console.log(emailMe);
          // User.findOne({
          //   where: {
          //     email: emailMe
          //   }
          // })
          User.sync()
          .then(function(hat){
            hat.update({
              firstname: "david"
            });
        })
});


router.get('/signup',function(request,response){
          response.render('sign-up.pug');
});


router.post('/signup',function(request,response){
  //     request.checkBody('email', 'Username field cannot be empty.').notEmpty();
  //     request.checkBody("password", "Password must be at least 8 characters and include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  //   // req.checkBody('passwordmatch', 'Password must be between 8-100 characters long.').len(8, 100);
  //   // request.checkBody('passwordmatch', 'Passwords do not match, please try again.').equals(request.body.password);
  //     const errors = request.validationErrors();
  //     if (errors) {
  //       console.log(`errors: ${JSON.stringify(errors)}`);
  //       response.render("sign-up.pug", {
  //         title: "registration error",
  //         errors: errors
  //       });
  // }else {
      User.findAll().then(function(){
          var hash = bcrypt.hashSync(request.body.password, saltRounds);
            User.create({
              email: request.body.email,
              firstname: request.body.firstname,
              lastname: request.body.lastname,
              password: hash
            })
          response.redirect('login');
          })
  // }
});




module.exports = router;
