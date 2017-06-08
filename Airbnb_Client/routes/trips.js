/**
 * Created by dthesiya on 11/21/2016.
 */

var mq_client = require("../rpc/client.js");
var ejs = require("ejs");
var winston = require('winston');

exports.tripPage = function (req, res) {
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/profile_yourTrips.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.getUserTrips = function (request, response) {
    var userId = request.session.userId;
    var msg_payload = {userId: userId};
    winston.info('User Trips get request', {'user': request.session.firstName, 'url_clicked': '/getUserTrips'});

    mq_client.make_request('getUserTrips_queue', msg_payload, function (err, trips) {

        if (!err) {
            for (var i = 0; i < trips.length; i++) {
                if (trips[i].isAccepted) {
                    trips[i].isAccepted = "Accepted";
                }
                else {
                    trips[i].isAccepted = "Pending";
                }
            }
            response.end(JSON.stringify(trips));
        }
    });
};

exports.acceptTrip = function (request, response) {
    winston.info('Accept Trip request', {'user': request.session.firstName, 'url_clicked': '/acceptTrip'});
    var tripId = request.body.tripId;
    var hostId = request.session.userId;
    var msg_payload = {tripId: tripId, hostId: hostId};
    mq_client.make_request('acceptTrip_queue', msg_payload, function (err, result) {

        if (!err && result.code == 200) {
            response.status(200);
            response.end();
        } else {
            response.status(400);
            response.end();
        }
    });
};

exports.displayItinerary = function (request, response) {

    var user_data = {
        "email": request.session.email,
        "firstname": request.session.firstName,
        "profileImg": request.session.profileImg,
        "isLoggedIn": request.session.isLoggedIn
    };
    ejs.renderFile('../views/viewitinerary.ejs', user_data, function (err, result) {
        response.end(result);
    });
};

exports.loadItinerary = function (request, response) {
    var tripId = request.body.tripId;
    var userId = request.session.userId;
    var msg_payload = {tripId: tripId, userId: userId};

    mq_client.make_request('getItinerary_queue', msg_payload, function (err, trips) {
        if (!err) {
            if (trips) {
                response.end(trips);
            } else {
                response.end();
            }
        } else {
            response.status(400);
            response.end();
        }
    });
};

exports.deleteTrip = function (request, response) {
    winston.info('Delete Trip request', {'user': request.session.firstName, 'url_clicked': '/deleteTrip'});
    var tripId = request.param("tripId");
    var msg_payload = {tripId: tripId};
    mq_client.make_request('DeleteTrip_queue', msg_payload, function (err, result) {
        if (!err) {
            response.status(200);
            response.end();
        } else {
            response.status(400);
            response.end();
        }
    });
};