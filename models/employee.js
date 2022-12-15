const {sequelize, Sequelize} = require('../dbConnection/dbConn');

//define employee model
var Employee = sequelize.define('Employee', {
    employeeNum : {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    firstName : {type: Sequelize.STRING},
    lastName : {type: Sequelize.STRING},
    email : {type: Sequelize.STRING},
    SSN : {type: Sequelize.STRING},
    addressStreet : {type: Sequelize.STRING},
    addressCity : {type: Sequelize.STRING},
    addressState : {type: Sequelize.STRING},    
    addressPostal : {type: Sequelize.STRING},
    maritalStatus : {type: Sequelize.STRING},
    isManager : {type: Sequelize.BOOLEAN},
    employeeManagerNum : {type: Sequelize.INTEGER},
    status : {type: Sequelize.STRING},
    department : {type: Sequelize.INTEGER},
    hireDate : {type: Sequelize.STRING}
}, {
  createdAt: false,
  updatedAt: false,})

module.exports = {Employee};