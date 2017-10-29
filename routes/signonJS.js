var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalSequelize = require('passport-local-sequelize')

var User = require("../models/user.js");


//logon page
router.get('/login',function(request,response){
          response.render('login-page.pug');
});


router.get('/signup',function(request,response){
          response.render('sign-up.pug');
});


router.get('/',function(request,response){
          response.redirect('/');
});


//signup
router.post('/signup',function(request,response){
  User
  .findAll()
  .then(function(){
    User.create({
      email: request.body.email,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      password: request.body.password
    })
    response.redirect('/login');
  })
});

module.exports = router;
