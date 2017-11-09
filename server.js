var express = require('express');
var bodyParser= require('body-parser');
var multer = require('multer');
var path = require("path");
var expressValidator = require('express-validator')

var signonJS = require('./routes/signonJS');
var postsJS = require('./routes/postsJS');
var bioJS = require('./routes/bioJS');

var router = express.Router();
var connection = require('./utility/sql.js');
// var Post = require('./models/post.js');
// var User = require('./models/user.js');

var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SequelizeStore = require('connect-session-sequelize')(session.Store);

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

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/',signonJS);
app.use('/',postsJS);
app.use('/',bioJS);



app.get('/',function(request,response){
  response.render('login-page.pug')
})

app.set(express.static('./public'));



//catch all (delete this piece of code)
app.get('*',function(request,response){
    response.status(404).send('uh oh! page not found!')
});

//part of hope this works
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
