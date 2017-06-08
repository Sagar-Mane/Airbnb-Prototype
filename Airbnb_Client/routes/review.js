/**
 * Created by Divya Patel on 11/21/2016.
 */



var express = require('express');
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");
var ejs = require('ejs');
var winston = require('winston');

exports.loadReviewAboutPage = function (req, res) {
    winston.info('Load review about', {'user': req.session.firstName, 'url_clicked': '/loadReviewAboutPage'});
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId
    };
    mq_client.make_request('loadReviewAboutPage_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            console.log("In err to save");
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


exports.loadReviewByPage = function (req, res) {
    winston.info('Load review by', {'user': req.session.firstName, 'url_clicked': '/loadReviewByPage'});
    var userId = req.session.userId;
    var msg_payload = {
        userId: userId
    };

    mq_client.make_request('loadReviewByPage_queue', msg_payload, function (err, user) {
        if (err) {
            console.log(err);
            console.log("In err to save");
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

exports.getHostReviewsCount = function (req, res) {
    winston.info('Host review count', {'user': req.session.firstName, 'url_clicked': '/hostReviewsCount'});
    var hostId = req.param("hostId");
    var msg_payload = {
        hostId: hostId
    };
    mq_client.make_request('hostReviewsCount_queue', msg_payload, function (err, result) {
        if (err) {
            console.log(err);
            res.send({"statusCode": 401});
            res.end();
        } else {
            res.send(result);
        }
    });
};


exports.getUserReview = function (request, response) {
    var userId = request.params.userId;
    winston.info('List review for user', {'user': request.session.firstName, 'url_clicked': '/getUserReview/'+userId});
    var msg_payload =
    {
        userId: userId
    }
    mq_client.make_request('getUserReview_queue', msg_payload, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            response.send({userReview: result});
        }
    });
};

exports.getHostReview = function (request, response) {
    var hostId = request.params.hostId;
    winston.info('List review for host', {'user': request.session.firstName, 'url_clicked': '/getHostReview/'+hostId});
    var msg_payload =
    {
        hostId: hostId
    }
    mq_client.make_request('getHostReview_queue', msg_payload, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            response.send({hostReview: result});
        }
    });
};


exports.addUserReview = function (request, response) {

    winston.info('add user review', {'user': request.session.firstName, 'url_clicked': '/addUserReview'});
    var msg_payload =
    {
        userId: request.body.userId,
        hostId: request.session.userId,
        review: request.body.review,
        rating: request.body.rating,
        image: request.body.image,
        createdDate: Date.now()
    }

    mq_client.make_request('addUserReview_queue', msg_payload, function (err, result) {
        if (err) {
            console.log(err);
            response.send({statusCode: 401});
        } else {
            response.send({statusCode: 200});
        }
    });
};


exports.addHostReview = function (request, response) {
    winston.info('add host review', {'user': request.session.firstName, 'url_clicked': '/addHostReview'});
    var msg_payload =
    {
        userId: request.session.userId,
        hostId: request.body.hostId,
        review: request.body.review,
        rating: request.body.rating,
        imageUrl: request.body.image,
        createdDate: Date.now()
    }

    mq_client.make_request('addHostReview_queue', msg_payload, function (err, result) {

        if (err) {
            console.log(err);
            response.send({statusCode: 401});
        } else {
            response.send({statusCode: 200});
        }
    });
};

exports.addPropertyReview = function (req, res) {
    winston.info('Property Review', {
        'user': req.session.firstName,
        'property_rated': req.body.propertyId,
        'property_rating': req.body.rating
    });
    var msg_payload =
    {
        userId: req.session.userId,
        hostId: req.body.hostId,
        review: req.body.review,
        rating: req.body.rating,
        imageUrl: req.body.url,
        propertyId: req.body.propertyId,
        createdDate: Date.now()
    }

    mq_client.make_request('addPropertyReview_queue', msg_payload, function (err, result) {

        if (err) {
            console.log(err);
            res.send({statusCode: 401});
        } else {
            res.send({statusCode: 200});
        }
    });
};