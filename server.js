var express = require('express');
var path    = require("path");
var bodyParser= require('body-parser');
var multer = require('multer');
var bcrypt = require('bcrypt');
var passport = require('passport');

var Post = require('./models/post.js');
var signonJS = require('./routes/signonJS');
var postsJS = require('./routes/postsJS');
// var indexJS = require('/routes/indexJS');

var EpicStrategy = require('passport-local').Strategy;
// var SequelizeStore = require('connect-session-sequelize')(session.Store);

var app = express();


const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});





app.set('view engine','pug');
app.set('view engine','ejs');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'photo')));


app.use('/go',signonJS);
app.use('/go',postsJS);

app.get('/',function(request,response){
  response.render('login-page.pug')
})


var bioArray = [
  {email: 'yimd85@gmail.com', firstN: 'david', lastN: 'yim',bioPath:''}
];

//render profile
app.get('/go/profile',function(request,response){
  Post.findAll().then(function(postArray){
          response.render('profile-page.pug',{weWantAnything:bioArray,anythingWeWant:postArray});
        })
})

var storagePicPic = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './photos/profilepic')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
	}
});

app.post('/go/profile',function(request,response){
  var upload = multer({
    storage: storagePicPic,
    fileFilter: function(request, file, callback) {
      var ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }
      callback(null, true)
    }
  }).single('uploadpictureForm');
  upload(request, response, function(err) {
        var profilestuff = "./photos/profilepic/"+request.file.filename;
        bioArray[0].bioPath = profilestuff
        response.redirect('/go/profile')
      })
});

//passport code
// app.use(session({
//   secret: "epic",
//   store: new SequelizeStore({
//     db: connection
//   })
// }));
//
// passport.use(new EpicStrategy(function(username, password, done) {
//     console.log(username);
//     console.log(password);
//     User.findOne({where: {username: username}})
//     .then(project =>{
//       if(project === null){
//         done(null,false);
//       }else{
//         console.log("username found in database");
//           console.log(project.password)
//           const hash = project.password
//           const useridcurrent = project.id
//           bcrypt.compare(password, hash, function(err, response){
//             if(response === true){
//               return done(null, {user_id: useridcurrent});
//             }else{
//               return done(null, false ,{message: "Incorrect Credentials"});
//             }
//           })
//         }
//
//     })
//
//
//     }));
//     passport.serializeUser(function(user_name, done) {
//       done(null, user_name);
//     });
//
//     passport.deserializeUser(function(user_name, done) {
//       done(null, user_name);
//     });
//end of passport code

//catch all (delete this piece of code)
app.get('*',function(request,response){
          response.status(404).send('uh oh! page not found!')
});

//port
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
