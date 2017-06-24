var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: {type: String},
    userName: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    email: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    phoneNumber: {type: String},
    profileImage: {type: String},
    cardNumber: {type: Number},
    cvv: {type: Number},
    expDate: {type: String},
    isHost: {type: Boolean, default: false},
    isActivated: {type: Boolean, default: true},
    isApproved: {type: Boolean, default: false},
    createdDate: {type: Number},
    isDeleted: {type: Boolean, default: false}
});

var User = mongoose.model('user', userSchema, 'user');
module.exports = User;