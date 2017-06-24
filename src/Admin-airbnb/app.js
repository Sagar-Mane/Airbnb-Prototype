var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var hostManagement = require('./routes/hostManagement');
var userManagement = require('./routes/userManagement');
var propertyManagement = require('./routes/propertyManagement');
var invoiceManagement = require('./routes/invoiceManagement');
var adminManagement = require('./routes/adminManagement');
require('./model/mongoconnect');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    cookieName: 'session',
    secret: '6692940916',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/admin', index.admin_checkLogin);
app.get('/topTenProperties', dashboard.topTenProperties); //done
app.get('/cityRevenue', dashboard.cityRevenue); //done
app.get('/topTenHost', dashboard.topTenHost); //done
app.get('/getAllHosts', hostManagement.getAllHosts); //done
app.get('/getAllUsers', userManagement.getAllUsers); //done
app.get('/getAllProperties', propertyManagement.getAllProperties); //done
app.get('/invoices', invoiceManagement.invoices);
app.get('/totalUsers', dashboard.totalUsers); //done
app.get('/totalHosts', dashboard.totalHosts); //done
app.get('/totalProperties', dashboard.totalProperties); //done
app.get('/totalRevenue', dashboard.totalRevenue); //done
app.get('/admin_dashboard', dashboard.admin_dashboard); //done
app.get('/admin_activeUserManagement', userManagement.admin_activeUserManagement); //done
app.get('/admin_activeHostManagement', hostManagement.admin_activeHostManagement); //done
app.get('/admin_activePropertyManagement', propertyManagement.admin_activePropertyManagement); //done
app.get('/admin_invoiceManagement', invoiceManagement.admin_invoiceManagement);
app.get('/unapprovedHost', hostManagement.unapprovedHost);
app.get('/admin_pendingHost', hostManagement.admin_pendingHost);
app.get('/admin_pendingProperty', propertyManagement.admin_pendingProperty);
app.get('/unapprovedProperty', propertyManagement.unapprovedProperty);
app.post('/getProperty', propertyManagement.getProperty);
app.post('/getUser', userManagement.getUser);
app.post('/getHost', hostManagement.getHost);
app.post('/getInvoice', invoiceManagement.getInvoice);
app.post('/getPendingHost', hostManagement.getPendingHost);
app.post('/getPendingProperty', propertyManagement.getPendingProperty);
app.post('/approveProperty', propertyManagement.approveProperty);
app.post('/approveHost', hostManagement.approveHost);
app.post('/admin_login', index.adminLogin);
app.get('/admin_logout', index.adminLogout);
app.get('/viewAddAdminPage', adminManagement.viewAddAdminPage);
app.post('/admin_add', adminManagement.addAdmin);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
