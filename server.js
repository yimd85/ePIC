// 'use strict'
var express = require('express');
var path    = require("path");
var bodyParser= require('body-parser');
var app = express();

//table creation variables
var User = require("./models/user.js");

const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });
//
// client.connect();
//
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });
app.use(express.static('./public'))

app.set('view engine','pug');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));




//logon page
app.get('/login',function(request,response){
          response.render('login-page');
});

//signup
app.post('/signup',function(request,response){
  User
    .findAll()
      .then(function(){
        User.create({
            email: request.body.email,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            password: request.body.password
        })
          response.redirect('/');
        })
});



app.post('/post',function(request,response){
  console.log('test')
});

app.get('/signup',function(request,response){
          response.render('sign-up');
});



//render homepage
app.get('/home',function(request,response){
          response.render('home-page')
})


//render post
app.get('/post',function(request,response){
          response.render('post-page')
})



//render post
app.get('/profile',function(request,response){
          response.render('profile-page')
})

//
//catch all (delete this piece of code)
app.get('*',function(request,response){
          response.status(404).send('uh oh! page not found!')
})

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });






//port
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
