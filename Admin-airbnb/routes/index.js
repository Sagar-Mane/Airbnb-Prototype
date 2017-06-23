var express = require('express');
var ejs = require('ejs');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('./mysql');


exports.admin_checkLogin = function (req, res, next) {


    if (req.session.adminId == null) {
        res.render('admin_login');
    } else {
        res.render('admin_dashboard');
    }
};


exports.adminLogout = function (req, res, next) {

    req.session.reset();
    res.redirect('/admin');
};

exports.adminLogin = function (req, res, next) {

    var email = req.param("email");
    var password = req.param("password");
    var query = "SELECT * from admin WHERE email='" + email + "';";
    mysql.fetchData(function (err, results) {

        if (err) {
            console.log(err);
        }
        else if (results.length > 0) {
            if (bcrypt.compareSync(password, results[0].password)) {
                req.session.adminFirstName = results[0].firstName;
                req.session.adminEmail = results[0].email;
                req.session.adminId = results[0].sr_no;
                req.session.superAdmin = results[0].isSuperAdmin;
                res.send("success");
            }


        }


    }, query);
};