/**
 * Created by vicky on 11/20/2016.
 */
var ejs = require("ejs");
var winston = require('winston');

exports.homepg = function (req, res) {
    winston.info('Home page rendered', {'user': req.session.firstName, 'url_clicked': '/'});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/homewithoutlogin.ejs', user_data, function (err, result) {
        res.end(result);
    });
};