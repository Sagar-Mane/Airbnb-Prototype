var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    tripId: {type: String},
    propertyId: {type: Schema.Types.ObjectId, ref: 'property'},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    hostId: {type: Schema.Types.ObjectId, ref: 'user'},
    checkIn: {type: Number},
    checkOut: {type: Number},
    noOfGuests: {type: Number},
    isAccepted: {type: Boolean, default: false},
    createdDate: {type: Number},
    price: {type: Number},
    days: {type: Number},
    total: {type: Number},
    isDeleted: {type: Boolean, default: false}
});

var Trip = mongoose.model('trip', tripSchema, 'trip');
module.exports = Trip;