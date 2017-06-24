/**
 * Created by Divya Patel on 12/3/2016.
 */

var ejs = require('ejs');
var url = require('url');
var winston = require('winston');
exports.handleError = function (req, res) {
    winston.info('Error occured', {'user': req.session.firstName, 'url_clicked': url.parse(req.url, true).pathname});
    var sess = req.session;
    var user_data = {
        "email": sess.email,
        "isLoggedIn": sess.isLoggedIn,
        "firstname": sess.firstName,
        "profileImg": req.session.profileImg
    };
    ejs.renderFile('../views/errorPage.ejs', user_data, function (err, result) {
        res.end(result);
    });


};