
var express = require('express')
var path    = require("path");
var bodyParser= require('body-parser')
// var Stuff = require("./models/models.js");
var app = express();

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


app.set('view engine','pug');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));




//logon page
app.get('/',function(request,response){
          response.render('logonPage');

});

//signup
app.get('/signup',function(request,response){
          response.render('signupPage');
});



//render homepage
app.get('/home',function(request,response){
          response.render('homePage')
})


//render post
app.get('/post',function(request,response){
          response.render('postPage')
})



//render post
app.get('/profile',function(request,response){
          response.render('profilePage')
})


//catch all
app.get('*',function(request,response){
          response.status(404).send('uh oh! page not found!')
})



//port
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
