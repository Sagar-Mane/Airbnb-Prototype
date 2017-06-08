/**
 * Created by shalin on 11/21/2016.
 */
var bcrypt = require('bcryptjs');
/*var fecha = require('fecha');*/
/*var mongo = require("./mongo");
 var config = require('./config.js');*/
var User = require('../model/user');
var Billing = require('../model/billing');
var Trip = require('../model/trip');
var mongoose = require('mongoose');
var ssn = require('ssn');
var ObjectId = require('mongoose').Types.ObjectId;


exports.updatePassword = function (msg, callback) {
    var opass = msg.old_password;
    var npass = msg.new_password;
    var username = msg.email;
    console.log(opass, npass);
    User.findOne({email: username}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            if (bcrypt.compareSync(opass, result.password)) {
                //if(opass===result.password){
                var salt = bcrypt.genSaltSync(10);
                var passwordToSave = bcrypt.hashSync(npass, salt);
                User.update({email: username}, {$set: {password: passwordToSave}}, function (err, user) {
                    if (err) {
                        callback(err, null);
                    }
                    else if (user) {
                        var res = {};
                        res.code = 200;
                        callback(null, res);
                    }
                });
            } else {
                callback(null, null);
            }
        }
    });
};

exports.updatePaymentMethod = function (msg, callback) {
    var cvv = msg.cvv;
    var cnos = Number(msg.cno);
    var edate = msg.expm + "/" + msg.expy;
    var username = msg.email;
    User.update({email: username}, {$set: {cardNumber: cnos, cvv: cvv, expDate: edate}}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            var res = {};
            res.code = 200;
            callback(null, res);
        }
    });
};

exports.payinTransactions = function (msg, callback) {
    Billing.find({
        hostId: new ObjectId(msg.uid),
        isDeleted: false
    }).populate('propertyId').populate('userId').exec(function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            var res = {};
            res.code = 200;
            res.data = result;
            callback(null, res);
        }
    });
};

exports.payoutTransactions = function (msg, callback) {
    Billing.find({
        userId: new ObjectId(msg.uid),
        isDeleted: false
    }).populate('propertyId').populate('hostId').exec(function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            var res = {};
            res.code = 200;
            res.data = result;
            callback(null, res);
        }
    });
};

exports.receiptPage = function (msg, callback) {
    Billing.find({
        isDeleted: false,
        $or: [
            {_id: new ObjectId(msg.bID)},
            {tripId: new ObjectId(msg.tripId)}
        ]
    })
        .populate('propertyId')
        .populate('hostId')
        .populate('userId')
        .populate('tripId')
        .exec(function (err, result) {
            if (err) {
                callback(err, null);
            }
            if (result) {
                var res = {};
                res.code = 200;
                res.data = result;
                callback(null, res);
            }
            if (!result) {
                callback(null, null);
            }
        });
};

exports.cardDetails = function (msg, callback) {
    User.find({email: msg.uid}).cache(300).exec(function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            var res = {};
            res.code = 200;
            res.data = result;
            callback(null, res);
        }
    });
};


exports.deleteBill = function (msg, callback) {

    var billId = msg.billId;
    Billing.update({_id: billId}, {$set: {isDeleted: true}}, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            console.log(err);
            callback(err, null);
        }
    });
};