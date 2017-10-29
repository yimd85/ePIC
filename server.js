var express = require('express');
var path    = require("path");
var bodyParser= require('body-parser');
var multer = require('multer');

var Post = require('./models/post.js');


var signonJS = require('./routes/signonJS');
var postsJS = require('./routes/postsJS');

var app = express();

app.set('view engine','pug');
app.set('view engine','ejs');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'photo')));


app.use('/',signonJS);
app.use('/',postsJS);



//temporary arrays
// var postArray = [
//   {text: "this is the alley image", photoPath: "/photos/alley.JPG"},
//   {text: "bridge image", photoPath: "/photos/bridge.JPG"},
//   {text: "roman empire", photoPath: "/photos/rome.JPG"},
// ];//We will need to make this into a database. This was just placeholder array

var bioArray = [
  {email: 'yimd85@gmail.com', firstN: 'david', lastN: 'yim',bioPath:''}
];

//temporary arrays


// app.get('/home',function(request,response){
//     response.render('homeEJS.ejs',{anythingWeWant:postArray})
// });




//render profile
app.get('/profile',function(request,response){
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

        var profilestuff = "./photos/profilepic/"+request.file.filename;
        bioArray[0].bioPath = profilestuff

        response.redirect('/profile')
      })
});


//catch all (delete this piece of code)
app.get('*',function(request,response){
          response.status(404).send('uh oh! page not found!')
});

//port
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
