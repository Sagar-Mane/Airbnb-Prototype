var Property = require('../model/property');
var User = require('../model/user');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');

exports.getAllProperties = function (req, res, next) {
    "use strict";
    var response = [];
    Property
        .find({isApproved: true, isAvailable: true})
        .populate('hostId')
        .exec(function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].hostId.isApproved) {
                        response.push(results[i]);
                    }
                }
            }
            res.send(response);

        });
};


exports.getProperty = function (req, res) {
    var propertyId = req.param("_id");
    var conditions = {_id: new ObjectId(propertyId)};
    Property.find({_id: conditions}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log("here is the property " + results);
            res.send(results);
        }
    })
};


exports.getPendingProperty = function (req, res) {
    var propertyId = req.param("_id");
    var conditions = {_id: new ObjectId(propertyId)};
    Property.find({_id: conditions}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log("here is the propegetPendingPropertyrty " + results);
            res.send(results);
        }
    })
};

exports.unapprovedProperty = function (req, res) {
    console.log("Call came here in unapprovedProperty");
    Property.find({isApproved: false, isAvailable: true}, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            res.send(results);
        }
    })
};


exports.approveProperty = function (req, res, next) {
    var response = {};
    var propertyId = req.param("_id");
    var conditions = {_id: new ObjectId(propertyId)};
    var update = {
        'isApproved': true
    };
    Property.update(conditions, update, function (err, results) {

        if (err) {
            throw err;
        } else {
            response.code = 200;
            response.message = "updated";
            res.render('admin_pendingProperty');
        }
    });
};


exports.admin_pendingProperty = function (req, res) {
    res.render('admin_pendingProperty');
};

exports.admin_activePropertyManagement = function (req, res) {
    res.render('admin_activePropertyManagement');
};