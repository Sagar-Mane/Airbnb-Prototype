/**
 * Created by Divya Patel on 12/2/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dynamicPrice = new Schema({

    propertyId: {type: Schema.Types.ObjectId, ref: 'property'},
    bookedCount: {type: Number}

});

var DynamicPrice = mongoose.model('dynamicPrice', dynamicPrice,'dynamicPrice');

module.exports = DynamicPrice;