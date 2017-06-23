var Billing = require('../model/billing');
var User = require('../model/user');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');

exports.invoices = function (req, res, next) {

    Billing
        .find({})
        .populate('propertyId')
        .populate('hostId')
        .populate('userId')
        .exec(function (err, invoices) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(invoices);
            }


        });
};

exports.getInvoice = function (req, res) {
    var invoiceId = req.param("_id");
    var conditions = {_id: new ObjectId(invoiceId)};
    Billing.find({_id: conditions})
        .populate('hostId')
        .populate('userId')
        .populate('propertyId')
        .exec(function (err, results) {
            if (err) {
                throw err;
            } else {

                console.log(results);
                res.send(results);
            }
        })

};


exports.admin_invoiceManagement = function (req, res) {
    res.render('admin_invoiceManagement');
};