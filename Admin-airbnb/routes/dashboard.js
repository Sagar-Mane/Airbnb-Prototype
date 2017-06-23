var Billing = require('../model/billing');
var Property = require('../model/property');
var User = require('../model/user');
var mongoose = require('mongoose');

exports.topTenProperties = function (req, res, next) {
    "use strict";
    var flag = false;
    var response = {};
    response.propertyName = [];
    response.revenue = [];
    Property
        .find({})
        .limit(10)
        .exec(function (err, properties) {


            for (let i = 0; i < properties.length; i++) {
                Billing.aggregate([{
                    $match: {
                        propertyId: properties[i]._id
                    }
                }, {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$total"
                        }
                    }
                }], function (err, revenue) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(revenue);
                    response.propertyName.push(properties[i].name);
                    if (revenue.length > 0) {
                        response.revenue.push(revenue[0].total);
                        flag = true;
                    }

                });

            }
            setTimeout(function (flag) {
                res.send(response);

            }, 500);
        });
};

exports.cityRevenue = function (req, res, next) {
    Property.aggregate([{
        $group: {
            _id: "$city",
            revenue: {
                $sum: "$revenue"
            }
        }
    }], function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send(result);

    });
};

exports.topTenHost = function (req, res, next) {
    var response = {};
    response.hostName = [];
    response.revenue = [];
    Property.aggregate([{
        $group: {
            _id: "$hostId",
            revenue: {
                $sum: "$revenue"
            }
        }
    }, {
        $sort: {
            revenue: -1
        }
    }, {
        $limit: 10
    }

    ], function (err, result) {
        if (err) {
            console.log(err);
        }

        User.populate(result, {
            path: '_id'
        }, function (err, results) {
            for (var i = 0; i < results.length; i++) {
                var name = results[i]._id.firstName + " " + results[i]._id.lastName;
                response.hostName.push(name);
                response.revenue.push(results[i].revenue);
            }
            res.send(response);
        });
    });
};

exports.totalUsers = function (req, res, next) {
    var response = {};
    console.log("Call is made to totalUsers Node.js");
    User
        .find({isHost: false, isActivated: true})
        .count()
        .exec(function (err, result) {
            response.totalUsers = result;
            console.log("In here " + result);
            res.send(response);
        });

};

exports.totalHosts = function (req, res, next) {
    var response = {};

    User
        .find({isHost: true, isApproved: true, isDeleted: false})
        .count()
        .exec(function (err, result) {
            response.totalH = result;
            res.send(response);
        });

};

exports.totalProperties = function (req, res, next) {
    var response = {};

    Property
        .find({isApproved: true})
        .count()
        .exec(function (err, result) {
            response.totalProperties = result;
            res.send(response);
        });

};

exports.totalRevenue = function (req, res, next) {
    var response = {};
    Property.aggregate([{
        $group: {
            _id: null,
            total: {
                $sum: "$revenue"
            }
        }
    }], function (err, totalRevenue) {
        if (err) {
            console.log(err);
        }
        else {
            response.totalRevenue = totalRevenue[0].total;
            res.send(response);
        }
    });
};

exports.admin_dashboard = function (req, res) {
    res.render('admin_dashboard');
};