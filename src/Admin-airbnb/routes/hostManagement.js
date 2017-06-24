var User = require('../model/user');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');


exports.getAllHosts = function (req, res, next) {

    User.find({isHost: true, isApproved: true, isDeleted: false}, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            console.log(results);
            res.send(results);
        }
    });

};


exports.unapprovedHost = function (req, res) {
    User.find({isHost: true, isApproved: false, isDeleted: false}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send(results);
        }
    })
};


exports.approveHost = function (req, res) {
    var response = {};
    var hostId = req.param("_id");
    var conditions = {_id: new ObjectId(hostId)};
    var update = {
        'isApproved': true
    };
    User.update(conditions, update, function (err, results) {
        if (err) {
            throw err;
        } else {
            response.code = 200;
            response.message = "updated";
            res.render('admin_pendingHost');
        }
    });
};


exports.getHost = function (req, res) {
    var hostId = req.param("_id");
    var conditions = {_id: new ObjectId(hostId)};
    User.find({_id: conditions}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log("here is the host " + results);
            res.send(results);
        }
    })
};


exports.getPendingHost = function (req, res) {
    console.log("Getting one pending host");
    var hostId = req.param("_id");
    var conditions = {_id: new ObjectId(hostId)};
    User.find({_id: conditions}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log("here is the pending host " + results);
            res.send(results);
        }
    })
};


exports.admin_activeHostManagement = function (req, res) {
    res.render('admin_activeHostManagement');

};


exports.admin_pendingHost = function (req, res) {
    res.render('admin_pendingHost');
};

