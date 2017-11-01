// passport.js
var express = require('express')
var passport = require('passport')
var http = require('http')
var EpicStrategy = require('passport-local').Strategy;
var session = require('express-sesssion')
var bcrypt = require('bcrypt')
const saltRounds = 10;
var Post = require('../models/post.js');
var likes = require('../models/likes.js');
// var photos = require('../models/photos.js');
var User = require('../models/user.js');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var fs = require('fs')
var router = express.Router();
router.use(require("body-parser")());



var app = express();

// configure Express
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view engine', 'pug');

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'epic' }));

//not 100% sure if we need
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname + '/login'));

router.use(express.static("public"));
router.use(session({
  secret: "epic"
}));

//////....LOGIN.....
// router.get('/login', function(req, res) {
//   console.log(req.user);
//   console.log(req.isAuthenticated());

//   res.render('login',{title:'Login'});
// });

// router.post('/login', passport.authenticate('local', {
//   successRedirect: 'home',
//   failureRedirect: 'login'
// }));



router.get('/login', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());

  res.render('login',{title:'Login'});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: 'gallery',
  failureRedirect: 'login'
}));




// router.post('/signonJS', function(req, res, next) {
//   req.checkBody('username', 'Username field cannot be empty.').notEmpty();
//   req.checkBody("password", "Password must be at least 8 characters and include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
//   // req.checkBody('passwordmatch', 'Password must be between 8-100 characters long.').len(8, 100);
//   req.checkBody('passwordmatch', 'Passwords do not match, please try again.').equals(req.body.password);
//   const errors = req.validationErrors();
//   if (errors) {
//     console.log(`errors: ${JSON.stringify(errors)}`);
//     res.render("signup", {
//       title: "signup error",
//       errors: errors
//     });
//   } else {
//     const userName = req.body.username;
//     const passWord = req.body.password;
//     var hash = bcrypt.hashSync(passWord, saltRounds);
//     User.create({
//       username: userName,
//       password: hash
//     }).then(function(results) {
//       const user_id = results.id;
//       console.log(results.id);
//       req.login(user_id, function(err) {
//         res.redirect('login');
//       });
//     });
//   }
// });
// //end


//auth routes
router.get('/home', authenticationMiddleware(), function(req, res) {

  console.log(req.user.user_id);
  console.log(req.isAuthenticated());
    Post.findAll().then(function(photos){
        User.findById(req.user.user_id).then(function(username){
           res.render('home',{postDatabase:photos, usernameDatabase:username.username});
        });

  });

});

router.get('/postsJS', authenticationMiddleware(), function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('postsJS');
});


//called on server.js
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



passport.use(new EpicStrategy({
    consumerKey: EPIC_API_KEY,
    consumerSecret: EPIC_SECRET_KEY,
    callbackURL: '/login'
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
    
      return done(null, profile);
    });
  }
));


app.get('/auth/epic',
  passport.authenticate('epic'),
  function(req, res){
    
  });

app.get('/auth/epic/callback',
  passport.authenticate('epic', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/home');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// var storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, './public/uploads')
//   },
//   filename: function(req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })


function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

  if (req.isAuthenticated()) { return next(); 
  res.redirect('/login');
 }
}
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

module.exports = router;
