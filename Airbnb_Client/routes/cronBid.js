/**
 * Created by kshah on 12/02/2016.
 */
var express = require('express');
var ejs = require('ejs');
var cron = require('node-cron');
var mq_client = require('../rpc/client');

cron.schedule('* * 5 * * *', function (req, res, next) {
    var msg_payload = {};
    mq_client.make_request('bidCron_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("Bidding Cron Success");
        }
    });
});

cron.schedule('* * * 1 *', function (req, res, next) {
    var msg_payload = {};
    mq_client.make_request('dynamicPriceCron_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("dynamic Cron Success");
        }
    });
});
