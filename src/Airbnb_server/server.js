var amqp = require('amqp'),
    util = require('util');
require('./model/mongoconnect');
var signIn = require('./services/signin');
var account = require('./services/account');
var search = require('./services/search');
var review = require('./services/review');
var property_detail = require('./services/property_detail');
var account_management = require("./services/account_management");

////////////////////////////

var trips = require('./services/trips');
var listings = require('./services/listings');
var user = require('./services/user');
var bid = require('./services/bid');

/////////////////////test////////////

// var test = require('./services/test');
//test.testUser();

////////////////////////////

var cnn = amqp.createConnection({host: '127.0.0.1'});
//require('./services/biddingChecker');
cnn.on('error', function (e) {
    console.log("error from amqp " + e);
});


cnn.on('ready', function () {

    cnn.queue('login_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            signIn.doLogin(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('register_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            signIn.registerUser(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('search_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            search.doSearch(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('property_detail_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            property_detail.getProperty(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('editUser_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.editUser(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('loadEditUser_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.loadEditUserPage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('loadReviewAboutPage_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            review.loadReviewAboutPage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('loadReviewByPage_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            review.loadReviewByPage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('hostReviewsCount_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            review.getHostReviewsCount(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('uploadProfileImage_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.uploadProfileImage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('loadProfilePhotoPage_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.loadProfilePhotoPage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('updatePassword_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.updatePassword(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('updatePaymentMethod_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.updatePaymentMethod(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('payinTransaction_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.payinTransactions(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('payoutTransactions_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.payoutTransactions(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('receiptPage_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.receiptPage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('loadPaymentPage_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.loadPaymentPage(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('getPropertyDetails_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.getPropertyDetails(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('confirmBooking_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.confirmBooking(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getUserTrips_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trips.getUserTrips(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('DeleteTrip_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trips.deleteTrip(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('DeleteBill_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.deleteBill(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('DeleteUser_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.deleteUser(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getActiveListings_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            listings.getActiveListings(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('addNewListing_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            listings.addNewListing(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getReservations_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            listings.getReservations(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('acceptTrip_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trips.acceptTrip(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getItinerary_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trips.getItinerary(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getUserProfile_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.getUserProfile(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getUserReview_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.getUserReview(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getHostReview_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.getHostReview(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('addUserReview_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.addUserReview(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('addHostReview_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            user.addHostReview(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('checkHost_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account.checkHost(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('cardDetail_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            // util.log(util.format(deliveryInfo.routingKey, message));
            // util.log("Message: " + JSON.stringify(message));
            // util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            account_management.cardDetails(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('addPropertyReview_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            review.addPropertyReview(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('updateBasePrice_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            bid.updateBasePrice(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('bidCron_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            bid.bidCron(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });


    cnn.queue('dynamicPriceCron_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            bid.dynamicPriceCron(message, function (err, res) {
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
});