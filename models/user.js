const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// define the User schema
var userSchema = new Schema({
  "userName":  {type: String, unique: true},
  "password": String,
  "email": String,
  "loginHistory": [{
    "dateTime": Date,
    "userAgent": String,
  }],
});

let User

module.exports = {userSchema, mongoose, User};