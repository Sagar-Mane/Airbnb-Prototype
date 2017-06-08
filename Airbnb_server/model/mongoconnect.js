/**
 * Created by Divya Patel on 11/6/2016.
 */
var mongoose = require('mongoose');
var gracefulShutdown;
//var dbURI = 'mongodb://team14:airbnb_14@ds011863.mlab.com:11863/airbnb';
var dbURI = 'mongodb://localhost:27017/airbnb';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI, {server: {poolSize: 1000}});
// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to- ' + dbURI);
});
var MongooseCache = require('mongoose-redis');
var cache = MongooseCache(mongoose, {port: 6379, host: 'localhost', compress: true});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});
