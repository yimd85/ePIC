var express = require('express');
var multer = require('multer');
var app = express();
var path    = require("path");
var bodyParser= require('body-parser');

//table creation variables
var User = require("./models/user.js");

// app.use(express.static('./public'));
app.set('view engine','pug');
app.set('view engine','ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'photo')));


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
          response.render('homeEJS', {anythingWeWant:postArray});
})

//render post
app.get('/post',function(request,response){

          response.render('postEJS')
})


//------------------multer stuff
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './photos')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})


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
    var posting = request.body.postmessage;
    var newStuff = {text:posting, photoPath:fileUpload}
    console.log(newStuff);
    console.log(fileUpload);
    postArray.push(newStuff);

    response.redirect('/home')

	})
});
//end multer stuff----------------

//render profile
app.get('/profile',function(request,response){
          response.render('profile-page')
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
