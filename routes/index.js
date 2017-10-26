// index.js
var express = require('express')
var router = express.Router();
//new post photos
var posts = require('./models/post');
var multer = require('multer'); //require multer(coipied and pasted)

var app = express()
var upload = multer({ dest: './postImages/uploads' })
// var sharp = require('sharp')



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

//MULTER DOCUMENTATION TEST
var requestHandler = multer({ storage: myStorage });

app.post('/profile', upload.single('avatar'), function (req, res, next) {
	// req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
})
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
	 // req.files is array of `photos` files 
  // req.body will contain the text fields, if there were any 
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files 
  // 
  // e.g. 
  //  req.files['avatar'][0] -> File 
  //  req.files['gallery'] -> Array 
  // 
  // req.body will contain the text fields, if there were any 
})




//routes/products.js
// router.post('./post', requestHandler.single('New Post'), function(req, res, next) {

// 		//call the sharp() function passing in the image we want to resize
// 		sharp(__dirname + '/../postImages/uploads/' + req.file.filename)
// 		// ignoreAspectRatio will not crop the image to fit the desired size
// 		.ignoreAspectRatio()
// 		// resize image to these dimensions (w x h) in pixels
// 		.resize(200, 200)
// 		// specify where to save the result
// 		.toFile(__dirname + '/../postImages/uploads/' + req.file.filename, function(err, info) {
// 			products.addProduct(req.body, req.file.filename)
//     res.redirect('./post');
// 		});
// });



module.exports = router;