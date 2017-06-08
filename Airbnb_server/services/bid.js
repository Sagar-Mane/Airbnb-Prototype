/**
 * Created by kshah on 12/02/2016.
 */
var Property = require('../model/property');
var Bidding = require('../model/bidding');
var Trip = require('../model/trip');
var mongoose = require('mongoose');
var ssn = require('ssn');
var DynamicPrice = require('../model/dynamicPrice');
var Map = require("hashmap");
var ObjectId = require('mongoose').Types.ObjectId;

exports.updateBasePrice = function (msg, callback) {
    var res = {};
    var propertyId = msg.propertyId;
    var maxBidPrice = msg.maxBidPrice;
    var hostId = msg.hostId;
    var latestBidder = msg.latestBidder;
    var userId = msg.userId;
    var currentTime = Date.now();
    Property.update({_id: new ObjectId(propertyId)}, {
        $set: {
            maxBidPrice: maxBidPrice,
            latestBidder: latestBidder
        }
    }, function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            var bidding = new Bidding();
            bidding.propertyId = propertyId;
            bidding.bidPrice = maxBidPrice;
            bidding.createdDate = currentTime;
            bidding.userId = userId;
            bidding.hostId = hostId;

            bidding.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.code = 200;
                    res.message = "success";
                    callback(null, res);
                }
            });
        }
    });
};

exports.bidCron = function (msg, callback) {
    "use strict";
    var res = {};
    var currentTime = Date.now();
    Property.find({
        biddingDueTime: {$lte: currentTime},
        isBidding: true,
        isBidCompleted: false
    }, function (err, result1) {
        if (err) {
            throw err;
        } else {
            for (let i = 0; i < result1.length; i++) {
                Property
                    .find({_id: new ObjectId(result1[i]._id)})
                    .populate('latestBidder')
                    .exec(function (err, result2) {
                        if (err) {
                            console.log(err);
                        } else {
                            var trip = new Trip();
                            trip.tripId = ssn.generate();
                            trip.propertyId = result2[0]._id;
                            trip.userId = result2[0].latestBidder._id;
                            trip.hostId = result2[0].hostId;
                            trip.checkIn = result2[0].startDate;
                            trip.checkOut = result2[0].endDate;
                            trip.noOfGuests = result2[0].maxGuest;
                            trip.isAccepted = false;
                            trip.createdDate = currentTime;
                            trip.save(function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    var conditions = {_id: new ObjectId(result2[0]._id)};
                                    var update = {
                                        'isBidCompleted': true,
                                        'isAvailable': false,
                                        'price': result2[0].maxBidPrice
                                    };
                                    Property.update(conditions, update, function (err, result3) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log("Flag Updated");
                                        }
                                    });
                                }
                            });
                        }
                    });
            }
            res.code = 200;
            callback(null, res);
        }
    });
};

exports.dynamicPriceCron = function (msg, callback) {


    var makeDate = new Date();
    makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1)).getTime();
    console.log(makeDate);

    Trip.find({createdDate: {$gt: makeDate}}).populate('propertyId').exec(function (err, result) {

        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {


            var map = new Map();
            var priceMap = new Map();

            for (var i = 0; i < result.length; i++) {


                var propertyId = result[i].propertyId._id.toString();

                if (map.has(propertyId)) {
                    map.set(propertyId, map.get(propertyId) + 1);
                }
                else {
                    map.set(propertyId, 1);
                    priceMap.set(propertyId, result[i].propertyId.price);
                }
            }

            var propertyIDArray = [];
            var dynamicpriceArray = [];
            console.log("count " + map.count());
            if (map.count() > 0) {

                map.forEach(function (value, key) {
                    if (value >= 10 && value < 20) {

                        propertyIDArray.push(key);
                        var newPrice = Number(priceMap.get(key)) * 1.1;
                        dynamicpriceArray.push(Math.round(newPrice));
                    }
                    else if (value >= 20 && value < 40) {

                        propertyIDArray.push(key);
                        var newPrice = Number(priceMap.get(key)) * 1.4;
                        dynamicpriceArray.push(Math.round(newPrice));
                    }
                    else if (value >= 40 && value < 50) {
                        propertyIDArray.push(key);
                        var newPrice = Number(priceMap.get(key)) * 1.7;
                        dynamicpriceArray.push(Math.round(newPrice));
                    }
                    else if (value >= 50) {
                        propertyIDArray.push(key);
                        var newPrice = Number(priceMap.get(key)) * 1.9;
                        dynamicpriceArray.push(Math.round(newPrice));
                    }
                });
            }
            var bulk = Property.collection.initializeOrderedBulkOp();

            for (var i = 0; i < propertyIDArray.length; i++) {

                console.log("Property id " + propertyIDArray[i] + ": " + dynamicpriceArray[i]);
                Property.update({_id: propertyIDArray[i]}, {
                    $set: {
                        price: dynamicpriceArray[i]
                    }
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    }
                    if (!result) {
                        console.log("not updated");
                        console.log(result);
                        callback(null, result);
                    }
                    if (result) {
                        console.log("Updated");
                        console.log(result);
                        callback(null, result);
                    }
                });

            }


        }
    });
};