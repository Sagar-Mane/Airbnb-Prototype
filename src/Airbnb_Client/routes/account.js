/**
 * Created by Divya Patel on 11/21/2016.
 */

var express = require('express');
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");
var ejs = require('ejs');
var winston = require('winston');

exports.editUser = function (req, res) {
    winston.info('Profile Edit Occured', {'user': req.session.firstName, 'url_clicked': '/editUser'});
    var firstName = req.param("firstName");
    var lastName = req.param("lastName");
    var email = req.param("email");
    var address = req.param("address");
    var state = req.param("state");
    var city = req.param("city");
    var zip = req.param("zip");
    var userId = req.session.userId;

    var msg_payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        state: state,
        city: city,
        zip: zip,
        userId: userId
    };
    mq_client.make_request('editUser_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            console.log("In err to save");
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
            res.end();
        } else {
            console.log("After editing user in client");
            //console.log(user);
            var json_responses = {"statusCode": 200};
            res.send(json_responses);
            res.end();
        }
    });
};


exports.getEditProfilePage = function (req, res) {
    winston.info('Edit Profile Page rendered', {'user': req.session.firstName, 'url_clicked': '/editProfilePage'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg
    };
    ejs.renderFile('../views/profile_edit_profile.ejs', user_data, function (err, result) {
        if (err) {
            console.log("Error in getting edit profile page");
            res.send("An error occured to get profile edit page");
        } else {
            res.end(result);
        }
    });
};


exports.getPaymentPage = function (req, res) {
    winston.info('Payment Page rendered', {'user': req.session.firstName, 'url_clicked': '/getPaymentPage'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg
    };
    ejs.renderFile('../views/paymentpage.ejs', user_data, function (err, result) {
        if (err) {
            console.log(err);
            res.send("An error occured to get payment page");
        } else {
            res.end(result);
        }
    });
};


exports.loadEditUserPage = function (req, res) {
    winston.info('Edit user page load', {'user': req.session.firstName, 'url_clicked': '/loadEditUserPage'});
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId
    };
    mq_client.make_request('loadEditUser_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
            res.end();
        } else {
            var json_responses = {"statusCode": 200, "data": user};
            res.send(json_responses);
            res.end();
        }
    });
};

exports.getUserPhotoPage = function (req, res) {
    winston.info('User photo page rendered', {'user': req.session.firstName, 'url_clicked': '/getUserPhotoPage'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg
    };
    ejs.renderFile('../views/profile_photo_tab.ejs', user_data, function (err, result) {
        if (err) {
            console.log(err);
            res.send("An error occured to get profile photo page");
        } else {
            res.end(result);
        }
    });
};


exports.getUserReviewAboutPage = function (req, res) {
    winston.info('User review about page rendered', {'user': req.session.firstName, 'url_clicked': '/getUserReviewAboutPage'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg
    };
    ejs.renderFile('../views/profile_review_about_you.ejs', user_data, function (err, result) {
        if (err) {
            console.log(err);
            res.send("An error occured to get profile review about page");
        } else {
            res.end(result);
        }
    });
};


exports.getUserReviewbyPage = function (req, res) {
    winston.info('User review by page rendered', {'user': req.session.firstName, 'url_clicked': '/getUserReviewbyPage'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg
    };
    ejs.renderFile('../views/profile_review_by_you.ejs', user_data, function (err, result) {
        if (err) {
            console.log(err);
            res.send("An error occured to get profile review by page");
        } else {
            res.end(result);
        }
    });
};

exports.uploadProfileImage = function (req, res) {
    winston.info('profile image uploaded', {'user': req.session.firstName, 'url_clicked': '/uploadProfileImage'});
    var file;
    if (!req.files) {
        var json = {"statusCode": 400}
        res.send(json);

    } else {
        var fileName = req.session.userId + '.png';
        file = req.files.profile_pic;
        file.mv('../public/images/' + fileName, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                var userId = req.session.userId;
                var msg_payload = {
                    userId: userId,
                    fileName: fileName
                };
                mq_client.make_request('uploadProfileImage_queue', msg_payload, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.redirect('/getUserPhotoPage')
                    } else {
                        res.redirect('/getUserPhotoPage')
                    }
                });
            }
        });
    }
};

exports.loadProfilePhotoPage = function (req, res) {
    winston.info('Profile photo load', {'user': req.session.firstName, 'url_clicked': '/loadProfilePhotoPage'});
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId
    };
    mq_client.make_request('loadProfilePhotoPage_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
            res.end();
        } else {
            var json_responses = {"statusCode": 200, "data": user};
            res.send(json_responses);
            res.end();
        }
    });
};


exports.getDashBoardPage = function (req, res) {
    winston.info('Dashboard Page request', {'user': req.session.firstName, 'url_clicked': '/getDashBoardPage'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": sess.profileImg,
        "userId": sess.userId + '.png',
        "isHost" :sess.isHost,
        "isApproved" : sess.isApproved
    };

    ejs.renderFile('../views/dashboard.ejs', user_data, function (err, result) {
        if (err) {
            console.log(err);
            res.send("An error occured to get dashboared by page");
        } else {
            res.end(result);
        }
    });

};


exports.loadPaymentPage = function (req, res) {
    winston.info('Payment Page request', {'user': req.session.firstName, 'url_clicked': '/loadPaymentPage'});
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId
    };

    mq_client.make_request('loadPaymentPage_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
            res.end();
        } else {
            var json_responses = {"statusCode": 200, "data": user};
            res.send(json_responses);
            res.end();
        }
    });
};

exports.getPropertyDetails = function (req, res) {
    var propertyId = req.param("propertyId");
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId,
        propertyId: propertyId
    };

    mq_client.make_request('getPropertyDetails_queue', msg_payload, function (err, property) {
        if (err) {
            console.log(err);
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
            res.end();
        } else {
            winston.info('Property Details request', {
                'user': req.session.firstName,
                'property_clicked': property._id,
                'property_type': property.category,
                'property_lat': property.latitude, 'property_long': property.longitude
            });
            var json_responses = {"statusCode": 200, "data": property};
            res.send(json_responses);
            res.end();
        }
    });
};

exports.confirmBooking = function (req, res) {
    winston.info('Property Book request', {'user': req.session.firstName, 'url_clicked': '/confirmBooking'});

    var userId = req.session.userId;
    var properyId = req.param("propertyId");
    var cardnumber = req.param("cardNumber");
    var expMonth = req.param("expMonth");
    var expYear = req.param("expYear");
    var cvv = req.param("cvv");
    var guest = req.param("guest");
    var checkin = req.param("checkin");
    var checkout = req.param("checkout");
    var price = req.param("price");
    var days = req.param("days");
    var hostId = req.param("hostId");

    var msg_payload = {
        "userId": userId,
        "propertyId": properyId,
        "cardNumber": cardnumber,
        "expMonth": expMonth,
        "expYear": expYear,
        "cvv": cvv,
        "guest": guest,
        "checkin": checkin,
        "checkout": checkout,
        "price": price,
        "days": days,
        "hostId": hostId
    };
    mq_client.make_request('confirmBooking_queue', msg_payload, function (err, data) {
        if (err) {
            console.log(err);
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
            res.end();
        } else {
            var json_responses = {"statusCode": 200, "data": data};
            res.send(json_responses);
            res.end();
        }
    });
};