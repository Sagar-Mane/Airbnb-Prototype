var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var biddingSchema = new Schema({
    hostId: {type: Schema.Types.ObjectId, ref: 'user'},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    propertyId: {type: Schema.Types.ObjectId, ref: 'property'},
    bidPrice: {type: Number},
    createdDate: {type: Number}
});

var Bidding = mongoose.model('bidding', biddingSchema,'bidding');
module.exports = Bidding;