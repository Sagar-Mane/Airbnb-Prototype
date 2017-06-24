var User = require('../model/user');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');

exports.getAllUsers = function (req, res, next) {
    User.find({isHost: false, isActivated: true}, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            console.log(results);
            res.send(results);
        }
    });
};


exports.getUser = function (req, res) {
    var userId = req.param("_id");
    var conditions = {_id: new ObjectId(userId)};
    console.log("Here " + conditions._id);
    User.find({_id: conditions}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log("The results are :" + results);
            res.send(results);
        }
    })
};


exports.admin_activeUserManagement = function (req, res) {
    res.render('admin_activeUserManagement');
};