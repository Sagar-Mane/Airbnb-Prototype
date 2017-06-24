var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
    imageUrl: [String],
    videoUrl: {type: String}
});

var Media = mongoose.model('media', mediaSchema, 'media');
module.exports = Media;