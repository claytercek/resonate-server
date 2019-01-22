var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	display_name: { type: String, default: null },
	id: {type: Number, default: null, min: 0},
	image_url: { type: String, default: null}
  });