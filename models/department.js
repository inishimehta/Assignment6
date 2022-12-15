const {sequelize, Sequelize} = require('../dbConnection/dbConn');

//define department model
var Department = sequelize.define('Department', {
    departmentId : {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    departmentName : {type: Sequelize.STRING}
}, {
  createdAt: false,
  updatedAt: false,})

module.exports = {Department};