/**
 * Created by shalin on 11/21/2016.
 */
var bcrypt = require('bcryptjs');
var express = require('express');
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");
var winston = require('winston');

exports.accountPage = function (req, res, next) {
    winston.info('Account page rendered', {'user': req.session.firstName, 'url_clicked': '/Account_Transactions'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    res.render('Account_Transactions', user_data);
};

exports.accountSecurityPage = function (req, res, next) {
    winston.info('Account security page rendered', {'user': req.session.firstName, 'url_clicked': '/Account_Security'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    res.render('Account_Security', user_data);
};

exports.accountPaymentMethodPage = function (req, res, next) {
    winston.info('Account payment method page rendered', {'user': req.session.firstName, 'url_clicked': '/Account_Payment_Method'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    res.render('Account_Payment_Method', user_data);
};

exports.updatePassword = function (req, res, next) {
    winston.info('password update', {'user': req.session.firstName, 'url_clicked': '/updatePassword'});
    var old_password = req.param("old_password");
    var new_password = req.param("new_password");
    var msg_payload = {
        old_password: old_password,
        new_password: new_password,
        email: req.session.email
    };
    mq_client.make_request('updatePassword_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            res.send("invalid");
        } else if (user) {
            res.send("valid")
        } else {
            res.send("invalid");
        }
    });
};

exports.updatePaymentMethod = function (req, res, next) {
    winston.info('Payment method update', {'user': req.session.firstName, 'url_clicked': '/paymentMethodUpdate'});
    var cvv = req.param("cvv");
    var cno = Number(req.param("cno"));
    var expm = req.param("expm");
    var expy = req.param("expy");
    var msg_payload = {
        cvv: cvv,
        cno: cno,
        expm: expm,
        expy: expy,
        email: req.session.email
    };
    mq_client.make_request('updatePaymentMethod_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send("OK");
        }
    });
};

exports.payinTransactions = function (req, res, next) {
    winston.info('Fetch payin transaction', {'user': req.session.firstName, 'url_clicked': '/payinTransaction'});
    var uid = req.session.userId;
    var msg_payload = {
        uid: uid
    };
    mq_client.make_request('payinTransaction_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(user.data);
        }
    });
};

exports.payoutTransactions = function (req, res, next) {
    winston.info('Fetch payout transaction', {'user': req.session.firstName, 'url_clicked': '/payoutTransaction'});
    var uid = req.session.userId;
    var msg_payload = {
        uid: uid
    };
    mq_client.make_request('payoutTransactions_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(user.data);
        }
    });
};

exports.receiptPage = function (req, res, next) {
    winston.info('Fetch reciept', {'user': req.session.firstName, 'url_clicked': '/receipt'});
    var billingID = req.param("billId");
    var tripId = req.param("tripId");
    var msg_payload = {
        bID: billingID,
        tripId: tripId
    };

    mq_client.make_request('receiptPage_queue', msg_payload, function (err, bill) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            var user_data = {
                "email": req.session.email,
                "isLoggedIn": req.session.isLoggedIn,
                "firstname": req.session.firstName,
                "profileImg": req.session.profileImg,
                "data": bill.data
            };
            res.render('receipt', user_data);
        }
    });
};

exports.cardDetails = function (req, res, next) {
    winston.info('Fetch card details', {'user': req.session.firstName, 'url_clicked': '/cardDetails'});
    var msg_payload = {
        uid: req.session.email
    };
    mq_client.make_request('cardDetail_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(user.data);
        }
    });
};

exports.deleteBill = function (request, response) {
    winston.info('Delete details', {'user': request.session.firstName, 'url_clicked': '/deleteBill'});
    var billId = request.param("billId");
    var msg_payload = {billId: billId};
    mq_client.make_request('DeleteBill_queue', msg_payload, function (err, result) {
        if (!err) {
            response.status(200);
            response.end();
        } else {
            response.status(400);
            response.end();
        }
    });
};