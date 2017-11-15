var express = require('express');
var bodyParser= require('body-parser');
var multer = require('multer');
var path = require("path");
var expressValidator = require('express-validator')

var signonJS = require('./routes/signonJS');
var postsJS = require('./routes/postsJS');
// var bioJS = require('./routes/bioJS');

var router = express.Router();
var connection = require('./utility/sql.js');
var Sequelize = require('sequelize');

var Post = require('./models/post.js');
var User = require('./models/user.js');

var session = require("express-session");
var passport = require('passport');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var cookieParser = require('cookie-parser')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var app = express();

connection.sync();
const { Client } = require('pg');


const client = new Client({
  connectionString: process.env.DATABASE_URL
  ,
  ssl: false,
});


app.set('view engine','pug');
app.set('view engine','ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'photo')));

app.use(cookieParser())


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,

}))



app.use(passport.initialize());
app.use(passport.session());


app.use('/',signonJS);
app.use('/',postsJS);
// app.use('/',bioJS);




passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({where: {email: email}})
        .then(project =>{
          if(project === null){
            done(null,false);
          }else{
            console.log("username found in database");
              console.log(project.password)
              const hash = project.password
              const useridcurrentEmail = project.email
              bcrypt.compare(password, hash, function(err, response){
                if(response === true){
                  return done(null, {user_identifier: useridcurrentEmail});
                }else{
                  return done(null, false ,{message: "Incorrect Credentials"});
                }
              })
            }
          })
}));


app.get('/',function(request,response){
  response.render('login-page.pug')
})

app.set(express.static('./public'));




app.get('*',function(request,response){
    response.status(404).send('uh oh! page not found!')
});

//part of hope this works
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
