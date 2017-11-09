var Sequelize = require('sequelize');
var connection = require('../utility/sql')


//datebase for Bio
var Bio = connection.define('bio', {
  email: Sequelize.STRING(100),
  photopath: Sequelize.STRING(100),
  text: Sequelize.STRING(100)
});

Bio.sync();

module.exports = Bio;
