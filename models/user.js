var Sequelize = require('sequelize');
var Sequelize = require('sequelize');
var connection = require('../utility/sql.js')



//datebase for users
var User = connection.define('user', {
  email: {
            type: Sequelize.STRING(100),
            isUnique: true,
            allowNull: false,
            validate:{
                isEmail : true
            }
        },
  firstname: Sequelize.STRING(100),
  lastname: Sequelize.STRING(100),
  password: Sequelize.STRING(100)
});



User.sync();

module.exports = User;
