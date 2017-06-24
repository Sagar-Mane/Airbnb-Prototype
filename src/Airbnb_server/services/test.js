/**
 * Created by dthesiya on 12/03/2016.
 */

var bcrypt = require('bcryptjs');
var User = require('../model/user');
var Property = require('../model/property');
var mongoose = require('mongoose');
var ssn = require('ssn');
var faker = require('faker');


exports.testUser = function () {
    var pass = bcrypt.hashSync("test", bcrypt.genSaltSync(10));
    var arr = [];
    for (var i = 0; i < 10; i++) {
        var userDetails = new User();
        userDetails.firstName = faker.name.firstName();
        userDetails.lastName = faker.name.lastName();
        userDetails.email = "testhostpending"+i+"@gmail.com";
        userDetails.password = pass;
        userDetails.address = faker.address.streetAddress();
        userDetails.city = faker.address.city();
        userDetails.zip = faker.address.zipCode();
        userDetails.state = faker.address.state();
        userDetails.phoneNumber = faker.phone.phoneNumber();
        userDetails.cardNumber = 5499839085447116;
        userDetails.cvv = 587;
        userDetails.expDate = "2/2019";
        userDetails.userId = ssn.generate();
        console.log(userDetails.userId);
        userDetails.createdDate = new Date().getTime();
        userDetails.isHost = true;
        userDetails.isApproved = false;
        arr.push(userDetails);
    }
    User.insertMany(arr);
    console.log("Done");
};
