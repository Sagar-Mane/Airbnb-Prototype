/**
 * http://usejsdoc.org/
 */
var bcrypt = require('bcryptjs');
/*var fecha = require('fecha');*/
/*var mongo = require("./mongo");
 var config = require('./config.js');*/
var User = require('../model/user');
var mongoose = require('mongoose');
var ssn = require('ssn');

exports.doLogin = function (msg, callback) {
    var username = msg.username;
    var password = msg.password;

    User.findOne({
        email: username,
        isDeleted: false
    }, function (err, result) {
        if (err) {
            callback(err, null);
        }

        if (!result) {
            callback(null, null);
        }
        if (result) {
            if (bcrypt.compareSync(password, result.password)) {
                callback(null, result);
            } else {
                callback(null, null);
            }
        }
    });
};

exports.registerUser = function (msg, callback) {
    var firstName = msg.firstName;
    var lastName = msg.lastName;
    var email = msg.email_id;
    var password = msg.password;
    var userDetails = new User();

    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    userDetails.email = email;
    userDetails.password = password;
    userDetails.userId = ssn.generate();
    userDetails.createdDate = new Date().getTime();
    userDetails.isHost = false;
    userDetails.isActivated = true;

    User.findOne({email: email}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            userDetails.save(function (err) {
                if (err) {
                    callback(err, null);
                } else {
                    var id = userDetails._id;
                    callback(null, userDetails);
                }
            });
        }
        if (result) {
            if (result.isDeleted === false) {
                result.firstName = firstName;
                result.lastName = lastName;
                result.email = email;
                result.password = password;
                result.userId = ssn.generate();
                result.createdDate = new Date().getTime();
                result.isHost = false;
                result.isActivated = true;
                result.isDeleted = false;
                result.save();
                callback(null, result);
            } else {
                callback(null, null);
            }
        }
    });
};