var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var multer = require('multer');
var path    = require("path");

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
  fileFilter: function(request, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'!== '.PNG' && ext !== '.JPG' && ext !== '.GIF' && ext !== '.JPEG') {
      return callback(response.redirect('/go/home'), null)
    }
    callback(null, true)
  }
}).single('fileupload');

// render homepage new stuff
router.get('/home',function(request,response){
  Post.findAll().then(function(postArray){
    response.render('homeEJS.ejs',{anythingWeWant:postArray})
  })
});

//render post
router.get('/post',function(request,response){
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
          response.redirect('/go/home');
  	   })
    })
});






module.exports = router;
