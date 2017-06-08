var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertyReviewSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    propertyId: {type: Schema.Types.ObjectId, ref: 'property'},
    review: {type: String},
    rating: {type: Number},
    imageUrl: {type: String},
    createdDate: {type: Number}
});

var PropertyReview = mongoose.model('propertyReview', propertyReviewSchema,'propertyReview');
module.exports = PropertyReview;