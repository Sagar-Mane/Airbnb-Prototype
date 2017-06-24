var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userReviewSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    hostId: {type: Schema.Types.ObjectId, ref: 'user'},
    review: {type: String},
    rating: {type: Number},
    image: {type: String},
    createdDate: {type: Number}
});

var UserReview = mongoose.model('userReview', userReviewSchema, 'userReview');
module.exports = UserReview;