// var express = require('express');
// var router = express.Router();
// var multer = require('multer');
// var path    = require("path");
// var Post = require('../models/post.js');
//
// router.use(express.static(path.join(__dirname, 'photo')));
//
// var bioArray = [
//   {email: 'yimd85@gmail.com', firstN: 'david', lastN: 'yim',bioPath:'../photos/sawsry.JPG'}
// ];
//
// //render profile
// router.get('/profile',function(request,response){
//   Post.findAll().then(function(postArray){
//           response.render('profile-page.pug',{weWantAnything:bioArray,anythingWeWant:postArray});
//         })
// })
//
// var storagePicPic = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, './photos/profilepic')
//   },
//   filename: function(req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
//   }
// });
//
// var upload = multer({
//   storage: storagePicPic,
//   fileFilter: function(request, response, callback) {
//     var ext = path.extname(response.originalname)
//     if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'!== '.PNG' && ext !== '.JPG' && ext !== '.GIF' && ext !== '.JPEG') {
//       return callback(response.redirect('/profile'), null)
//     }
//     callback(null, true)
//   }
// }).single('uploadpictureForm');
//
//
//
// router.post('/profile',function(request,response){
//   upload(request, response, function(err) {
//         var profilestuff = "../photos/profilepic/"+request.file.filename;
//         bioArray[0].bioPath = profilestuff
//         response.redirect('/profile')
//       })
// });
//
//
// module.exports = router;
