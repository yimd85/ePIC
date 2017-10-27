var express = require('express');
var multer = require('multer');
var app = express();
var path    = require("path");
var bodyParser= require('body-parser');
//table creation variables
var User = require("./models/user.js");

//testing to see if post works
var Post = require("./models/post.js");

// app.use(express.static('./public'));
app.set('view engine','pug');
// app.set('view engine','ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'photo')));


//logon page
app.get('/login',function(request,response){
          response.render('login-page');
});


app.get('/signup',function(request,response){
          response.render('sign-up');
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

var postArray = [
  {text: "this is the alley image", photoPath: "/photos/alley.JPG"},
  {text: "bridge image", photoPath: "/photos/bridge.JPG"},
  {text: "roman empire", photoPath: "/photos/rome.JPG"},
];//We will need to make this into a database. This was just placeholder array

//render homepage
app.get('/home',function(request,response){
  //change home-page to use ejs or pug
          response.render('home-page', {anythingWeWant:postArray});
})

//render post
app.get('/post',function(request,response){
//change post-page to use ejs or pug
          response.render('post-page')
})


//------------------multer stuff
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './photos')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
      // this belongs after date now==> path.extname(file.originalname))
	}
});


app.post('/post', function(request, response) {

  var upload = multer({
		storage: storage,
		fileFilter: function(request, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('fileupload');
	upload(request, response, function(err) {

    var fileUpload = "/photos/"+request.file.filename;
    //took out .filename
    var posting = request.body.postmessage;
    var newStuff = {text:posting, photoPath:fileUpload}
    console.log(newStuff);
    console.log(fileUpload);
    postArray.push(newStuff);

    response.redirect('/home')

	})
});
//end multer stuff----------------

var bioArray = [
  {email: 'yimd85@gmail.com', firstN: 'david', lastN: 'yim'}
];

//render profile
app.get('/profile',function(request,response){
          response.render('profile-page',{weWantAnything:bioArray,anythingWeWant:postArray});
})

var storagePicPic = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './photos/profilepic')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
      // this belongs after date now==> path.extname(file.originalname))
	}
});



app.post('/profile',function(request,response){
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

        var profilestuff = "/photos/profilepic/"+request.file.filename;
        //took out .filename
        var newPicture = {bioPath:profilestuff}
        console.log(profilestuff);
        console.log(newPicture);

        bioArray.push(newPicture);
        console.log(bioArray);
        
        response.redirect('/profile')
      })
})


//
//catch all (delete this piece of code)
app.get('*',function(request,response){
          response.status(404).send('uh oh! page not found!')
});

//port
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
