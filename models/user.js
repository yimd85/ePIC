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



//datebase for users
var User = sequelize.define('user', {
  email: Sequelize.STRING(100),
  firstname: Sequelize.STRING(100),
  lastname: Sequelize.STRING(100),
  password: Sequelize.STRING(100)
});

User.sync();

module.exports = User;