/**
 * Created by dthes on 11/21/2016.
 */
/**
 * http://usejsdoc.org/
 */
/*var fecha = require('fecha');*/
var User = require('../model/user');
var Property = require('../model/property');
var Media = require('../model/media');
var Trip = require('../model/trip');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
exports.doSearch = function (msg, callback) {
    "use strict";
    //added
    var user_id = msg.user_id;
    var location = msg.location;
    var property_type = (!msg.property_type || msg.property_type.trim().length === 0) ? ["Entire home/apt", "Private room", "Shared room"] : msg.property_type.split(",");
    var checkin = toDate(msg.checkin);
    var checkout = toDate(msg.checkout);
    var checkinmillis = checkin.getTime();
    var checkoutmillis = checkout.getTime();
    var guests = msg.guests;
    var propertiesIds = [];
    var propertiesIdsWithoutTrip = [];
    var response = {
        total: 0,
        per_page: 0,
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
        from: 1,
        to: 0,
        data: []
    };
    var flag = false;
    var len = property_type.length;
    Property.find(
        {
            hostId: {$ne: user_id},
            $text: {$search: location},
            maxGuest: {$gte: guests},
            isAvailable: true,
            isApproved: true,
            category: {$in: property_type}
        }
    )
        .populate('hostId')
        .populate('mediaId')
        .exec(function (err, properties) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                if (!properties) {
                    callback(null, null);
                } else {
                    for (let i = 0; i < properties.length; i++) {
                        Trip.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            {propertyId: properties[i]._id},
                                            {isAccepted: true},
                                            {isDeleted: false},
                                            {
                                                $or: [{
                                                    $and: [
                                                        {checkIn: {$lte: checkinmillis}},
                                                        {checkOut: {$gt: checkinmillis}}
                                                    ]
                                                }, {
                                                    $and: [
                                                        {checkIn: {$lt: checkoutmillis}},
                                                        {checkOut: {$gte: checkoutmillis}}
                                                    ]
                                                }, {
                                                    $and: [
                                                        {checkIn: {$eq: checkinmillis}},
                                                        {checkOut: {$eq: checkoutmillis}}
                                                    ]
                                                }, {
                                                    $and: [
                                                        {checkIn: {$gt: checkinmillis}},
                                                        {checkOut: {$lt: checkoutmillis}}
                                                    ]
                                                }
                                                ]
                                            }
                                        ]
                                    }

                                }], function (err, prop) {
                                if (properties[i] && prop.length > 0 && new ObjectId(prop[0].propertyId).equals(new ObjectId(properties[i]._id))) {
                                    propertiesIds.push(prop[0].propertyId);
                                }
                                if (i === properties.length - 1) {
                                    flag = true;
                                }
                            }
                        )
                    }

                    setTimeout(function (flag) {
                        for (let i = 0; i < properties.length; i++) {
                            var record = properties[i];
                            var exists = false;
                            for (let j = 0; j < propertiesIds.length; j++) {
                                if (new ObjectId(propertiesIds[j]).equals(new ObjectId(record._id))) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (exists === false) {
                                var datum = {
                                    id: record._id,
                                    user_id: (record.hostId) ? record.hostId._id : null,
                                    name: record.name,
                                    summary: record.description,
                                    accommodates: record.maxGuest,
                                    bedrooms: record.bedrooms,
                                    bathrooms: record.bathrooms,
                                    host_name: (record.hostId) ? record.hostId.firstName : null,
                                    created_at: record.createdDate,
                                    updated_at: record.createdDate,
                                    photo_name: (record.mediaId) ? record.mediaId.imageUrl[0] : "",
                                    images: (record.mediaId) ? record.mediaId.imageUrl : [],
                                    video_url: (record.mediaId) ? record.mediaId.videoUrl : "",
                                    sub_name: "",
                                    property_type: 2,
                                    room_type: 0,
                                    beds: record.beds,
                                    bed_type: 3,
                                    amenities: "1,2,4,5,6,7,10,11,15,17,18,19,22,23,24,25,28,29,30",
                                    calendar_type: "Always",
                                    booking_type: null,
                                    cancel_policy: "Flexible",
                                    popular: "Yes",
                                    started: "Yes",
                                    status: "Listed",
                                    deleted_at: null,
                                    steps_count: 0,
                                    property_type_name: record.category,
                                    room_type_name: record.category,
                                    bed_type_name: "Pull-out Sofa",
                                    reviews_count: 0,
                                    overall_star_rating: "",
                                    rooms_address: {
                                        room_id: record._id,
                                        address_line_1: record.address,
                                        address_line_2: "",
                                        city: record.city,
                                        state: record.state,
                                        country: record.country,
                                        postal_code: record.zip,
                                        latitude: record.latitude,
                                        longitude: record.longitude,
                                        country_name: record.country,
                                        steps_count: 0
                                    },
                                    rooms_price: {
                                        room_id: record.id,
                                        night: record.price,
                                        week: 0,
                                        month: 0,
                                        cleaning: 0,
                                        additional_guest: 0,
                                        guests: 0,
                                        security: 0,
                                        weekend: 0,
                                        currency_code: "USD",
                                        steps_count: 0,
                                        original_night: record.price,
                                        original_week: 0,
                                        original_month: 0,
                                        original_cleaning: 0,
                                        original_additional_guest: 0,
                                        original_security: 0,
                                        original_weekend: 0,
                                        code: "USD",
                                        currency: {
                                            id: 1,
                                            name: "US Dollar",
                                            code: "USD",
                                            symbol: "$",
                                            rate: "1.00",
                                            status: "Active",
                                            default_currency: "1",
                                            paypal_currency: "Yes",
                                            original_symbol: "$"
                                        }
                                    },
                                    users: (record.hostId) ? {
                                        id: record.hostId._id,
                                        userSSN: record.hostId.userId,
                                        first_name: record.hostId.firstName,
                                        last_name: record.hostId.lastName,
                                        email: record.hostId.email,
                                        dob: "0000-00-00",
                                        gender: null,
                                        live: "",
                                        about: "",
                                        school: "",
                                        work: "",
                                        timezone: "UTC",
                                        fb_id: "",
                                        google_id: "",
                                        status: "Active",
                                        created_at: record.hostId.createdDate,
                                        updated_at: record.hostId.createdDate,
                                        deleted_at: null,
                                        dob_dmy: "",
                                        age: 0,
                                        full_name: record.hostId.firstName + " " + record.hostId.lastName,
                                        profile_picture: {
                                            user_id: record.hostId._id,
                                            src: record.hostId.profileImage,
                                            photo_source: "Local",
                                            header_src: record.hostId.profileImage,
                                            email_src: record.hostId.profileImage
                                        }
                                    } : null
                                };
                                response.data.push(datum);
                            }
                        }
                        response.total = response.data.length;
                        response.per_page = response.data.length;
                        response.to = response.data.length;
                        callback(null, response);
                    }, 500);
                }
            }
        );
};

function toDate(dateStr) {
    var parts = dateStr.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}