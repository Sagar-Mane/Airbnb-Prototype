/**
 * http://usejsdoc.org/
 */
var bcrypt = require('bcryptjs');
var express = require('express');
var winston = require('winston');

var ejs = require("ejs");
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");
/*var log = require("./log");*/
/*
 var mongo = require("./mongo");
 var config = require('./config.js');
 */
var passport = require("passport");
require('./passport')(passport);


exports.loginpg = function (req, res) {
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg
    };
    ejs.renderFile('../views/login.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.authenticateUser = function (req, res, next) {
    winston.info ('Authentication request', {'user':req.body.email_id, 'url_clicked':'/signin'});
//	var email_id = req.body.email_id;
//	var pwd = req.body.password;
    var sess = req.session;
    sess.isLoggedIn = false;
    passport.authenticate('login', function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.json({
                success: false,
                message: 'No user found'
            });
            res.end();
        }
        if (user) {
            sess.email = user.email;
            sess.firstName = user.firstName;
            sess.userSSN = user.userId;
            sess.isLoggedIn = true;
            sess.profileImg = user.profileImage;
            sess.isHost = user.isHost;
            sess.isApproved = user.isApproved;
            // sess.last_name = user.last_name;
            sess.userId = user._id;
            // // sess.last_access = user.last_access;
            res.json({
                success: true,
                message: 'Logged in'
            });
            res.end();
        }
    })(req, res, next);
};

exports.signout = function (req, res) {
    winston.info ('Signout request', {'user':req.session.firstName, 'url_clicked':'/signout'});
    req.session.destroy();
    res.redirect("/");
};

exports.registerUser = function (req, res) {
    winston.info ('Registration request', {'user':req.body.email_id, 'url_clicked':'/registerUser'});
    var f_name = req.body.first_name;
    var l_name = req.body.last_name;
    var email_id = req.body.email_id;
    var pwd = req.body.password;
    var sess = req.session;
    sess.isLoggedIn = false;

    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(pwd, salt);
    var msg_payload = {
        firstName: f_name,
        lastName: l_name,
        email_id: email_id,
        password: passwordToSave
    };
    mq_client.make_request('register_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            sess.userSSN = results.userId;
            sess.firstName = results.firstName;
            sess.lastName = results.lastName;
            sess.userId = results._id;
            sess.email = results.email;
            sess.isHost = results.isHost;
            sess.isApproved = results.isApproved;
            sess.isLoggedIn = true;
            res.json({
                success: true,
                message: 'Registered'
            });
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });
};




	