var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require("connect-mongo")(session);
var mongo = require("mongodb").MongoClient;
var winston = require('winston');
var url = require('url');

var fileUpload = require('express-fileupload');
var routes = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var home = require('./routes/home');
var account = require('./routes/account');
var search = require('./routes/search');
var review = require('./routes/review');
var property = require('./routes/property');
var account_management = require('./routes/account_management');
var listings = require('./routes/listings');
var trips = require('./routes/trips');
var bid = require('./routes/bid');
var cronBid = require('./routes/cronBid');
var errorPage = require('./routes/errorPage');
var redis = require('./routes/redisConnect');


var app = express();
app.use(fileUpload());
app.use(passport.initialize());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: "mongodb://localhost:27017/airbnb"
    })
}));

winston.add(winston.transports.File, {
    filename: 'airbnb.log'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'logos', 'airbnb.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Authentication and Authorization Middleware
app.use(function (req, res, next) {
    res.header(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    var authorizeUrlArr = ["/signin", "/login", "/registerUser", "/searchResult", "/search",
        "/property", "/detail", "/hostReviewsCount", "/profile", "/getUserProfile", "/", ""];
    var url_parts = url.parse(req.url, true);
    if (authorizeUrlArr.indexOf(url_parts.pathname.split("/")[0]) > -1) {
        return next();
    } else {
        if (req.session.userId) {
            return next();
        } else {
            res.redirect("/");
        }
    }
});

app.post('/signin', signin.authenticateUser);
app.post('/registerUser', signin.registerUser);

app.get('/searchResult', search.search);
app.get('/search', search.loadSearchPg);
app.get('/', home.homepg);
app.get('/login', signin.loginpg);
app.get('/signout', signin.signout);
app.post('/registerUser', signin.registerUser);
app.post('/editUser', account.editUser);
app.get('/editProfilePage', account.getEditProfilePage);
app.get('/getUserPhotoPage', account.getUserPhotoPage);
app.get('/getUserReviewAboutPage', account.getUserReviewAboutPage);
app.get('/getUserReviewbyPage', account.getUserReviewbyPage);
app.post('/loadEditUserPage', account.loadEditUserPage);
app.get('/property', property.loadDetailPg);
app.get('/detail', property.getProperty);
app.get('/Account_Transactions', account_management.accountPage);
app.get('/Account_Security', account_management.accountSecurityPage);
app.get('/Account_Payment_Method', account_management.accountPaymentMethodPage);
app.get('/payinTransaction', account_management.payinTransactions);
app.get('/payoutTransaction', account_management.payoutTransactions);
app.post('/updatePassword', account_management.updatePassword);
app.post('/paymentMethodUpdate', account_management.updatePaymentMethod);

app.get('/hostReviewsCount', review.getHostReviewsCount);
app.post('/loadReviewAboutPage', review.loadReviewAboutPage);
app.post('/loadReviewByPage', review.loadReviewByPage);
app.post('/uploadProfileImage', account.uploadProfileImage);
app.post('/loadProfilePhotoPage', account.loadProfilePhotoPage);
app.get('/getDashBoardPage', account.getDashBoardPage);
app.get('/getPaymentPage', account.getPaymentPage);
app.post('/loadPaymentPage', account.loadPaymentPage);
app.post('/getPropertyDetails', account.getPropertyDetails);
app.post('/confirmBooking', account.confirmBooking);

app.get('/receipt', account_management.receiptPage);

/////////////////bidding///////////////////

app.post('/updateBasePrice', bid.updateBasePrice);

/////////////////delete////////////////////

app.get('/deleteUser', users.deleteUser);
app.delete('/deleteTrip', trips.deleteTrip);
app.delete('/deleteBill', account_management.deleteBill);

/////////////////your listing and your trips//////////////////

app.get('/yourTrips', trips.tripPage);
app.get('/addProperty', property.addProperty);
app.get('/yourListings', listings.yourListings);
app.get('/profile/*', users.userProfile);

app.get('/addListing', listings.addListing);
app.get('/becomeHost', listings.becomeHost);

app.get('/getUserProfile/:userId', users.getUserProfile);

app.get('/getUserReview/:userId', review.getUserReview);
app.get('/getHostReview/:hostId', review.getHostReview);
app.post('/addUserReview', review.addUserReview);
app.post('/addHostReview', review.addHostReview);
app.post('/addPropertyReview', review.addPropertyReview);
app.post('/uploadImage', listings.uploadImage);
app.post('/uploadVideo', listings.uploadVideo);
app.post('/addNewListing', listings.addNewListing);
app.get('/getActiveListings', listings.getActiveListings);
app.get('/getActiveListings/:userId', listings.getActiveListingsFromId);
app.get('/getReservations', listings.getReservations);


app.get('/getUserTrips', trips.getUserTrips);
app.post('/acceptTrip', trips.acceptTrip);
app.get('/itinerary/:tripId', trips.displayItinerary);
app.post('/itinerary', trips.loadItinerary);

app.get('/cardDetails', account_management.cardDetails);

////////////////////////////////////////////


app.get('/signin', isAuthenticated, function (req, res) {
    res.redirect('/');
});
function isAuthenticated(req, res, next) {
    if (req.session.user_id) {
        console.log(req.session.user_id);
        return next();
    }
    res.redirect('/signinPg');
}

app.all('*', errorPage.handleError);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
