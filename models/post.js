//posts and comments
var Sequelize = require('sequelize');

if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  });
}


//datebase for posts
var Post = sequelize.define('posting', {
  text: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
  photoPath: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
});

//datebase for comments
var Commenting = sequelize.define('Comment', {
  comment: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
});


Commenting.belongsTo(Post);


Post.sync();
module.exports = Post;
