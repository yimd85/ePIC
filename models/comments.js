//posts and comments
var Post = require('./post.js');
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


var Commenting = sequelize.define('commenting', {
  postingid: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
  message: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
});

// Commenting.belongsTo(Post);

Commenting.sync();



module.exports = Commenting;
