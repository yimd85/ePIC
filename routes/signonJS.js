var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local');
var passportLocalSequelize = require('passport-local-sequelize')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require("../models/user.js");


//logon page
router.get('/login',function(request,response){
    console.log(request.body.email);
  console.log(request.isAuthenticated());
          response.render('login-page.pug');
});

router.post('/login',function(request,response){
  console.log(request.body.email);
  console.log(request.isAuthenticated());
  // console.log(request)
          response.redirect('/home');
});



router.get('/signup',function(request,response){
  console.log(request.body.email);
  console.log(request.isAuthenticated());
          response.render('sign-up.pug');
});


// Express Validator
router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


//signup
router.post('/signup',function(request,response){
  request.checkBody('username', 'Username field cannot be empty.').notEmpty();
  request.checkBody("password", "Password must be at least 8 characters and include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  // req.checkBody('passwordmatch', 'Password must be between 8-100 characters long.').len(8, 100);
  request.checkBody('passwordmatch', 'Passwords do not match, please try again.').equals(request.body.password);
  const errors = request.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    response.render("sign-up.pug", {
      title: "registration error",
      errors: errors
    });
  }else {
  User
  .findAll()
  .then(function(){
    var hash = bcrypt.hashSync(request.body.password, saltRounds);
    User.create({
      email: request.body.email,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      password: hash
    })
    response.redirect('/go/login');
  })
}
});


function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('login')
  }
}
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

module.exports = router;
