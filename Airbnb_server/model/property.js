var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
    propertyId: {type: String},
    name: {type: String},
    hostId: {type: Schema.Types.ObjectId, ref: 'user'},
    mediaId: {type: Schema.Types.ObjectId, ref: 'media'},
    category: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zip: {type: String},
    maxGuest: {type: Number},
    beds: {type: Number},
    bedrooms: {type: Number},
    bathrooms: {type: Number},
    description: {type: String},
    price: {type: Number},
    dynamicPrice: {type: Number},
    maxBidPrice: {type: Number},
    biddingDueTime: {type: Number},
    isBidding: {type: Boolean, default: false},
    isBidCompleted: {type: Boolean, default: false},
    latestBidder: {type: Schema.Types.ObjectId, ref: 'user'},
    isApproved: {type: Boolean, default: false},
    isAvailable: {type: Boolean, default: true},
    latitude: {type: String},
    longitude: {type: String},
    createdDate: {type: Number},
    revenue: {type: Number},
    startDate: {type: Number},
    endDate: {type: Number}
});

propertySchema.index({city: 'text'});

var Property = mongoose.model('property', propertySchema, 'property');
module.exports = Property;