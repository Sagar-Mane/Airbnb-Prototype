/**
 * Created by dthesiya on 11/21/2016.
 */
/**
 * Created by dthes on 11/21/2016.
 */
/**
 * http://usejsdoc.org/
 */
var fecha = require('fecha');
var User = require('../model/user');
var Property = require('../model/property');
var Media = require('../model/media');
var PropertyReview = require('../model/propertyReview');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getProperty = function (msg, callback) {

    var id = msg.id;
    Property.findOne({_id: new ObjectId(id)})
        .populate('hostId')
        .populate('mediaId')
        .exec(function (err, record) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                if (!record) {
                    callback(null, null);
                } else {
                    PropertyReview.find({propertyId: new ObjectId(id)})
                        .populate('userId')
                        .exec(function (err1, records) {
                            if (err1) {
                                console.log(err1);
                                callback(err1, null);
                            }
                            var reviews = [];
                            var rating = 0;
                            if (records) {
                                for (var i = 0; i < records.length; i++) {
                                    var r = records[i];
                                    var review = {
                                        createdDate: fecha.format(new Date(r.createdDate), 'MMMM YYYY'),
                                        review: r.review,
                                        rating: r.rating,
                                        firstName: (r.userId) ? r.userId.firstName : "",
                                        lastName: (r.userId) ? r.userId.lastName : "",
                                        userImg: (r.userId) ? (r.userId.profileImage) ? r.userId.profileImage : "" : "",
                                        imageUrl: (r.imageUrl) ? r.imageUrl : ""
                                    };
                                    rating += r.rating;
                                    reviews.push(review);
                                }
                            }
                            rating = (records.length > 0) ? rating / records.length : "No Reviews";
                            var resp = {
                                reviews: reviews,
                                rating: rating,
                                id: record._id,
                                user_id: (record.hostId) ? record.hostId._id : null,
                                name: record.name,
                                summary: record.description,
                                accommodates: record.maxGuest,
                                startDate: record.startDate,
                                endDate: record.endDate,
                                maxBidPrice: record.maxBidPrice,
                                bedrooms: (record.bedrooms) ? record.bedrooms : 3,
                                bathrooms: (record.bathrooms) ? record.bathrooms : 2.5,
                                host_name: (record.hostId) ? record.hostId.firstName : null,
                                created_at: new Date(record.createdDate),
                                updated_at: new Date(record.createdDate),
                                photo_name: (record.mediaId) ? record.mediaId.imageUrl[0] : "",
                                images: (record.mediaId) ? record.mediaId.imageUrl : [],
                                video_url: (record.mediaId) ? record.mediaId.videoUrl : "",
                                isBidding: (record.isBidding) ? record.isBidding : false,
                                sub_name: "",
                                property_type: record.category,
                                room_type: 0,
                                beds: 3,
                                bed_type: "Pull-out Sofa",
                                amenities: "1,2,4,5,6,7,10,11,15,17,18,19,22,23,24,25,28,29,30",
                                calendar_type: "Always",
                                booking_type: null,
                                cancel_policy: "Flexible",
                                popular: "Yes",
                                started: "Yes",
                                status: "Listed",
                                deleted_at: null,
                                steps_count: 0,
                                property_type_name: "Bed & Break Fast",
                                room_type_name: record.category,
                                bed_type_name: "Futon",
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
                                        symbol: "&#36;",
                                        rate: "1.00",
                                        status: "Active",
                                        default_currency: "1",
                                        paypal_currency: "Yes",
                                        original_symbol: "&#36;"
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
                                    created_at: (record.hostId.createdDate) ? fecha.format(new Date(record.hostId.createdDate), 'MMMM YYYY') : "",
                                    updated_at: (record.hostId.createdDate) ? fecha.format(new Date(record.hostId.createdDate), 'MMMM YYYY') : "",
                                    deleted_at: null,
                                    dob_dmy: "",
                                    age: 0,
                                    full_name: record.hostId.firstName + " " + record.hostId.lastName,
                                    profile_picture: {
                                        user_id: record.hostId._id,
                                        photo_source: "Local",
                                        src: (record.hostId.profileImage) ? record.hostId.profileImage : "",
                                        header_src: (record.hostId.profileImage) ? record.hostId.profileImage : "",
                                        email_src: (record.hostId.profileImage) ? record.hostId.profileImage : ""
                                    }
                                } : null
                            };
                            callback(null, resp);
                        });
                }
            }
        );
};