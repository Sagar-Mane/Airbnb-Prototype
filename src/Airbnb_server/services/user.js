/**
 * Created by Parth on 23-11-2016.
 */
var fecha = require('fecha');
var User = require('../model/user');
var UserReview = require('../model/userReview');
var HostReview = require('../model/hostReview');
var mongoose = require('mongoose');

exports.getUserProfile = function (msg, callback) {
    User.findOne({userId: msg.userId}, function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            result.createdDate = fecha.format(((result.createdDate) ? new Date(result.createdDate) : new Date()), 'MMMM YYYY');
            callback(null, result);
        }
    });
}


exports.getUserReview = function (msg, callback) {
    UserReview.find({userId: msg.userId})
        .populate('hostId')
        .exec(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
}

exports.getHostReview = function (msg, callback) {
    HostReview.find({hostId: msg.hostId})
        .populate('userId')
        .exec(function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
}

exports.addUserReview = function (msg, callback) {
    var newReview = new UserReview();
    newReview.userId = mongoose.Types.ObjectId(msg.userId);
    newReview.hostId = mongoose.Types.ObjectId(msg.hostId);
    newReview.review = msg.review;
    newReview.rating = msg.rating;
    newReview.image = msg.image;
    newReview.createdDate = msg.createdDate;
    newReview.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


exports.addHostReview = function (msg, callback) {
    var newReview = new HostReview();
    newReview.userId = mongoose.Types.ObjectId(msg.userId);
    newReview.hostId = mongoose.Types.ObjectId(msg.hostId);
    newReview.review = msg.review;
    newReview.rating = msg.rating;
    newReview.imageUrl = msg.imageUrl;
    newReview.createdDate = msg.createdDate;
    newReview.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


exports.deleteUser = function (msg, callback) {

    var userId = msg.userId;
    User.update({_id: userId}, {$set: {isDeleted: true}}, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
};