var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostReviewSchema = new Schema({
    hostId: {type: Schema.Types.ObjectId, ref: 'user'},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    review: {type: String},
    rating: {type: Number},
    imageUrl: {type: String},
    createdDate: {type: Number}
});

var HostReview = mongoose.model('hostReview', hostReviewSchema,'hostReview');
module.exports = HostReview;