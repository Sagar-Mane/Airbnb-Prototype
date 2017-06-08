
var request = require('request');
var express = require('express');
var assert = require("assert");
var http = require("http");
describe('Unit Test', function(){
    it('Review About Page Testing', function(done) {
        request.post(
            'http://localhost:3000/loadReviewAboutPage',
            { form: { } },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('Review By Page Testing', function(done) {
        request.post(
            'http://localhost:3000/loadReviewByPage',
            { form: { } },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('Edit User Testing', function(done) {
        request.post(
            'http://localhost:3000/loadEditUserPage',
            { form: { } },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('Payment Page Testing', function(done) {
        request.post(
            'http://localhost:3000/loadPaymentPage',
            { form: { } },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
    it('Profile Photo Testing', function(done) {
        request.post(
            'http://localhost:3000/loadProfilePhotoPage',
            { form: { } },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
});