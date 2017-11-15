var express = require('express');
var router = express.Router();
var multer = require('multer');
var path    = require("path");
var Post = require('../models/post.js');
var Commenting = require('../models/comments.js');

router.use(express.static(path.join(__dirname, 'photo')));


var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './photos')
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function(request, response, callback) {
    var ext = path.extname(response.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'!== '.PNG' && ext !== '.JPG' && ext !== '.GIF' && ext !== '.JPEG') {
      return callback(response.redirect('/home'), null)
    }
    callback(null, true)
  }
}).single('fileupload');


// render homepage new stuff
router.get('/home',authenticationMiddleware(),function(request,response){
  console.log("authenticated user "+request.user.user_identifier);
  console.log("is user authenticated "+request.isAuthenticated());
  Post.findAll().then(function(postArray){
      Commenting.findAll().then(function(commentArray){
          response.render('homeEJS.ejs',{anythingWeWant:postArray
            , weWantAnything:commentArray
          })
      })
  })
});



router.post('/home/:id/comments',function(request,response){
    var test ={
        postingid: request.params.id,
        message: request.body.postcomment
    };

    Commenting.create(test).then(
      function(){
            response.redirect('/home');
     })
});

//render post
router.get('/post',authenticationMiddleware(),function(request,response){
          response.render('post-page.pug')
})


router.post('/post', function(request, response) {
  upload(request, response, function(err) {
      var full = {
        text: request.body.postmessage,
        photoPath: `${"/photos/"}`+request.file.filename
        }

      Post.create(full).then(
        function(){
          response.redirect('/home');
  	   })
    })
});


function authenticationMiddleware() {
  return (request, response, next) => {
    console.log(`request.session.passport.user: ${JSON.stringify(request.session.passport)}`);

    if (request.isAuthenticated()) return next();
    response.redirect('/login')
  }
}




module.exports = router;
