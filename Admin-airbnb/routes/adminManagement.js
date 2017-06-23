var express = require('express');
var ejs = require('ejs');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('./mysql');
var ssn = require('ssn');
exports.viewAddAdminPage = function (req, res, next) {


    res.render('add_admin');
};


exports.addAdmin = function (req, res, next) {


    var firstName = req.param("firstName");
    var lastName = req.param("lastName");
    var password = req.param("password");
    var encryptPassword = bcrypt.hashSync(password);
    var city = req.param("city");
    var state = req.param("state");
    var zip = req.param("zip");
    var email = req.param("email");
    var address = req.param("address");
    var contactNumber = req.param("contactNumber");
    var admin_id = ssn.generate();
    var query = "INSERT into airbnb.admin(firstName,lastName,password,city,state,zip,email,address,contactNumber,admin_id) VALUES ('" + firstName + "','" + lastName + "','" + encryptPassword + "','" + city + "','" + state + "','" + zip + "','" + email + "','" + address + "','" + contactNumber + "','" + admin_id + "');";

    mysql.storeData(function (err, result) {
        if (err) {
            throw err;
        } else if (result != null) {

            res.send("success");
        }
    }, query);
};