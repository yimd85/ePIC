var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var Commenting = require('../models/post.js');
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
      return callback(response.redirect('/home'), null)
    }
    callback(null, true)
  }
}).single('fileupload');

// render homepage new stuff
router.get('/home',function(request,response){
  Post.findAll(
  //   {
  //   include:[{
  //     model: Commenting
  //   }]
  // }
)
  .then(function(postArray){
    response.render('homeEJS.ejs',{anythingWeWant:postArray})
  })
});

// Post.hasMany(Commenting);
// Commenting.belongsTo(Post);


router.post('/home/:id/comments',function(request,response){
  Post.findById(reqest.params.id).
  then(function(row){
    if(!row){
      response.status(404).send('could not find that post');
      return;
    }
    row.createComment({
      comment: request.body.comment,
    }).
    then(function(comment){
      response.redirect('/home')
    })
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
          response.redirect('/home');
  	   })
    })
});






module.exports = router;
