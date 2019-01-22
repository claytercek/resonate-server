const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user.model').userSchema;


const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
});


const playlistSchema = new Schema({
	title: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	description: String,
	tags: { type: [String], index: true },
	location: { type: pointSchema, index: true },
	tracks: [String],
	mood: { type: pointSchema, index: true }
	// TODO: Add image
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = {Playlist};