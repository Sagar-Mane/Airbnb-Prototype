/**
 * Created by karan on 10/03/2016.
 */
var mysql = require('mysql');
var ejs = require('ejs');
var res = require("ejs");

function getConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'airbnb',
        password: 'airbnb_14',
        database: 'airbnb',
        port: 3306
    });
    return connection;
}
exports.fetchData = function (callback, sqlQuery) {
    console.log("data fetching");
    connection = getConnection();
    connection.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log("Error: " + err.message);
        } else {
            console.log("query success");
            callback(err, rows);

        }
    });
    connection.end()
};

exports.storeData = function (callback, sqlQuery) {
    console.log("data storing");
    connection = getConnection();
    connection.query(sqlQuery, function (err, results) {
        if (err) {
            console.log("Error: " + err);
            callback(err, results);
        } else {
            console.log("\nConnection released");
            console.log("Query Success");
            callback(err, results);
        }
    });
    connection.end()

};