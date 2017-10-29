var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var multer = require('multer');
var path    = require("path");

router.use(express.static(path.join(__dirname, 'photo')));


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



var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './photos')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
	}
});


router.post('/post', function(request, response) {

  var upload = multer({
		storage: storage,
		fileFilter: function(request, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(response.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('fileupload');
	upload(request, response, function(err) {

    var fileUpload = "/photos/"+request.file.filename;
    var posting = request.body.postmessage;
    console.log(fileUpload);
    console.log(posting);
    Post.findAll().then(function(){
      Post.create({
        text: `${posting}`
        ,
        photoPath: `${fileUpload}`
        })


    // var newStuff = {text:posting, photoPath:fileUpload}
    // postArray.push(newStuff);

	   })
  response.redirect('/home');
  })
});






module.exports = router;
