var Sequelize = require('sequelize');
var connection = require('../utility/sql.js')


var Like = connection.define('liking', {
  email: {
            type: Sequelize.STRING(100),
            isUnique: true,
            allowNull: false,
            validate:{
                isEmail : true
            }
        },
  postnumber: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
});



Like.sync();


module.exports = Like;
