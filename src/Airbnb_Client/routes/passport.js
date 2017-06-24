/*var log = require("./log");*/
var passport = require("passport");
var bcrypt = require('bcryptjs');
var LocalStrategy = require("passport-local").Strategy;
var mq_client = require('../rpc/client');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
        usernameField: 'email_id',
        passwordField: 'password'
    }, function (username, password, done) {
        var msg_payload = {username: username, password: password};
        mq_client.make_request('login_queue', msg_payload, function (err, results) {
            console.log(results);
            if (err) {
                return done(err);
            }
            if (!results) {
                return done(null, false);
            }
            if (results) {
                return done(null, results);
            }
        });
    }));
};
