var Sequelize = require('sequelize');
var connection = require('../utility/sql.js')


var Commenting = connection.define('commenting', {
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
