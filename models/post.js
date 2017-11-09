//posts and comments
var Sequelize = require('sequelize');
var connection = require('../utility/sql.js')


//datebase for posts
var Post = connection.define('posting', {
  text: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
  photoPath: {
            type: Sequelize.STRING(100),
            allowNull: true
        }

});

Post.sync();

module.exports = Post;
