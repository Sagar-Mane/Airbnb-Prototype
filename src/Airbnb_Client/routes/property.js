/**
 * Created by dthesiya on 11/21/2016.
 */
/**
 * Created by dthes on 11/21/2016.
 */
/**
 * http://usejsdoc.org/
 */
var express = require('express');
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");
var ejs = require("ejs");
var winston = require('winston');
var redis = require('./redisConnect');

exports.addProperty = function (req, res) {
    winston.info('Property add page rendered', {'user': req.session.firstName, 'url_clicked': '/addProperty'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/becomehostMainPage.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.loadDetailPg = function (req, res) {
    winston.info('detail page loaded', {'user': req.session.firstName, 'url_clicked': '/property'});
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/detail.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.getProperty = function (req, res, next) {
    var id = req.param("propertyId");
    winston.info('Display specific property by id', {'user': req.session.firstName, 'url_clicked': '/detail'});
    var msg_payload = {
        id: id
    };

    var client = redis.getClient();
    if (client.hget("properties",req.param("propertyId"), function (err, reply) {
            if (err) {
                console.log("error in redis cache: " + err);
            } else if (!reply) {
                console.log("property not in redis cache");
                mq_client.make_request('property_detail_queue', msg_payload, function (err, result) {
                    if (err) {
                        console.log(err);
                        var json_responses = {"statusCode": 401};
                        res.send(json_responses);
                    } else {
                        client.hmset("properties",req.param("propertyId"), JSON.stringify(result),redis.print);
                        res.send(result);
                        res.end();
                    }
                });
            } else if (reply) {
                res.send(reply);
                res.end();
            }
        })
    );



   /* mq_client.make_request('property_detail_queue', msg_payload, function (err, result) {
     console.log(result);
     if (err) {
     console.log(err);
     var json_responses = {"statusCode": 401};
     res.send(json_responses);
     } else {
     console.log(result);
     // var json_responses = {"statusCode": 200, "data": result};
     res.send(result);
     res.end();

     }
     });*/
};
