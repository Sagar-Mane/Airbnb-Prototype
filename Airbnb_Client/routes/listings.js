/**
 * Created by dthesiya on 11/22/2016.
 */

var mq_client = require("../rpc/client.js");
var ejs = require("ejs");
var winston = require('winston');

exports.addListing = function (req, res) {
    winston.info('Add listing page rendered', {'user': req.session.firstName, 'url_clicked': '/addListing'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/becomehostDescription.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.becomeHost = function (req, res) {
    winston.info('Become host called', {'user': req.session.firstName, 'url_clicked': '/becomeHost'});
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId
    };

    mq_client.make_request('checkHost_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            var user_data = {
                "email": req.session.email,
                "isLoggedIn": req.session.isLoggedIn,
                "firstname": req.session.firstName,
                "profileImg": req.session.profileImg
            };
            if (user.isHost == true && user.isApproved == true) {
                ejs.renderFile('../views/becomeHostMainPage.ejs', user_data, function (err, result) {
                    res.end(result);
                });
            } else {
                ejs.renderFile('../views/requestForHost.ejs', user_data, function (err, result) {
                    res.end(result);
                });
            }
        }
    });
};

exports.yourListings = function (req, res) {
    winston.info('Your listing page rendered', {'user': req.session.firstName, 'url_clicked': '/yourListings'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/profile_activeListings.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.getActiveListings = function (request, response) {
    winston.info('List active property', {'user': request.session.firstName, 'url_clicked': '/yourListings'});
    var userId = request.session.userId;
    console.log(userId);
    var msg_payload = {userId: userId};

    mq_client.make_request('getActiveListings_queue', msg_payload, function (err, properties) {
        if (!err) {
            response.end(JSON.stringify(properties));
        } else {
            console.log(err);
            response.end();
        }
    });
};

exports.getActiveListingsFromId = function (request, response) {
    var userId = request.params.userId;
    winston.info('List active property by id', {'user': request.session.firstName, 'url_clicked': '/getActiveListings/'+userId});
    var msg_payload = {userId: userId};

    mq_client.make_request('getActiveListings_queue', msg_payload, function (err, properties) {
        if (!err) {
            response.end(JSON.stringify(properties));
        } else {
            console.log(err);
            response.end();
        }
    });
};

exports.uploadImage = function (request, response) {
    winston.info('Image upload', {'user': request.session.firstName, 'url_clicked': '/uploadImage'});
    var fileName = Date.now() + request.session.userId + '.jpg';
    var image = (request.files) ? request.files.file : null;
    console.log("IMAGES");
    console.log(image);
    if(image){
        image.mv('../public/images/' + fileName, function (err) {
            if (err) {
                console.log(err);
                response.send({statusCode: 401});
            } else {
                response.send({statusCode: 200, url: fileName});
            }
        });
    }
    else{

        response.send({statusCode: 201});
    }
}

exports.uploadVideo = function (request, response) {
    winston.info('Video upload', {'user': request.session.firstName, 'url_clicked': '/uploadVideo'});
    var fileName = Date.now() + request.session.userId + '.mp4';
    var video = request.files.file;
    video.mv('../public/videos/' + fileName, function (err) {
        if (err) {
            console.log(err);
            response.send({statusCode: 401});
        } else {
            response.send({statusCode: 200, url: fileName});
        }
    });
}

function saveMedia(Media, userId) {

    var mediaUrls = [];
    for (var i = 0; i < Media.length; i++) {
        var base64Data = Media[i].replace(/^data:image\/jpeg;base64,/, "");
        var fileName = userId + Date.now() + i + ".png";
        mediaUrls.push(fileName);
        require("fs").writeFile(imageFolder + fileName, base64Data, 'base64', function (err) {
            console.log(err);
        });
    }
    return mediaUrls;
}

exports.addNewListing = function (request, response) {
    winston.info('New Listing added', {'user': request.session.firstName, 'url_clicked': '/addNewListing'});
    var mediaUrls = request.param("media");
    var video;
    if (request.param("video")) {
        video = request.param("video");
    } else {
        video = "";
    }
    var msg_payload = {
        "hostId": request.session.userId,
        "maxGuest": request.param("maxGuest"),
        "roomType": request.param("roomType"),
        "category": request.param("propertyType"),
        "city": request.param("city"),
        "state": request.param("state"),
        "address": request.param("address"),
        "zipCode": request.param("zipCode"),
        "bedrooms": request.param("bedrooms"),
        "beds": request.param("beds"),
        "bathrooms": request.param("bathrooms"),
        "name": request.param("name"),
        "description": request.param("description"),
        "price": request.param("price"),
        "latitude": request.param("latitude"),
        "longitude": request.param("longitude"),
        "createdDate": request.param("createdDate"),
        "isApproved": request.param("isApproved"),
        "isBidding": request.param("isBidding"),
        "startDate": request.param("startDate"),
        "endDate": request.param("endDate"),
        "media": mediaUrls,
        "video": video
    }

    mq_client.make_request('addNewListing_queue', msg_payload, function (err, result) {
        if (!err) {
            if (result.statusCode == 200) {
                response.send({result: result});
            }
        } else {
            console.log(err);
            response.end();
        }
    });
}

exports.getReservations = function (request, response) {
    winston.info('List reservation', {'user': request.session.firstName, 'url_clicked': '/getReservations'});
    var hostId = request.session.userId;
    var msg_payload = {hostId: hostId};

    mq_client.make_request('getReservations_queue', msg_payload, function (err, reservations) {

        if (!err) {
            response.end(JSON.stringify(reservations));
        } else {
            console.log(err);
            response.end();
        }
    });
};