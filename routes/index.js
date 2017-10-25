// index.js
var express = require('express')
var router = express.Router();
//new post photos
var posts = require('../postImages/uploads');
var multer = require('multer'); //require multer(coipied and pasted)

var app = express()
var upload = multer({ dest: 'uploads/' })
var sharp = require('sharp')



router.get('./post', function(req, res, next) {
	res.render('posts/add', {title: 'New Post', nav: 'Add'})
});


router.get('/:id', function(req, res, next) {
	console.log(req.params.id);
	var post = posts.findById(req.params.id);
	res.render('post/show', {post: post, title: 'Post Details', nav: 'Post'})
});


// routes/products.js
var myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
  	//not sure if this is the right route ***
    cb(null, __dirname + '/../postImages/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
} });


//routes/products.js
var requestHandler = multer({ storage: myStorage });


router.post('./post', requestHandler.single('New Post'), function(req, res, next) {

		//call the sharp() function passing in the image we want to resize
		sharp(__dirname + '/../postImages/uploads/' + req.file.filename)
		// ignoreAspectRatio will not crop the image to fit the desired size
		.ignoreAspectRatio()
		// resize image to these dimensions (w x h) in pixels
		.resize(200, 200)
		// specify where to save the result
		.toFile(__dirname + '/../postImages/uploads/' + req.file.filename, function(err, info) {
			products.addProduct(req.body, req.file.filename)
    res.redirect('./post');
		});
});



module.exports = router;