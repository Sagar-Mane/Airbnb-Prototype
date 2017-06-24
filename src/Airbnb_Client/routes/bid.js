/**
 * Created by kshah on 12/01/2016.
 */
var express = require('express');
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");
var ejs = require("ejs");
var winston = require('winston');

exports.updateBasePrice = function (req, res, next) {
    winston.info('New Property Bid', {
        'user': req.session.firstName,
        'property_bid': req.param("propertyId"),
        'bid_price': req.param("maxBidPrice")
    });
    var propertyId = req.param("propertyId");
    var maxBidPrice = req.param("maxBidPrice");
    var hostId = req.param("hostId");
    var latestBidder = req.session.userId;
    var userId = req.session.userId;
    var msg_payload = {
        propertyId: propertyId,
        maxBidPrice: maxBidPrice,
        hostId: hostId,
        latestBidder: latestBidder
    };

    mq_client.make_request('updateBasePrice_queue', msg_payload, function (err, result) {
        if (err) {
            console.log(err);
            var json_responses = {"statusCode": 401};
            res.send(json_responses);
        } else {
            res.send(result);

        }
    });
};