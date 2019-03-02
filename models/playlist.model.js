const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user.model').userSchema;


const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		default: 'Point',
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true
	}
},{ _id : false });

const trackSchema = new mongoose.Schema({
	title: String,
	artists: [String],
	album: String,
	image_url: String,
	spotify_id: String,
	duration: Number
},{ _id : false });


const playlistSchema = new Schema({
	title: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	description: String,
	tags: { type: [String]},
	location: { type: pointSchema },
	tracks: [trackSchema],
	mood: { type: pointSchema },
	color: {type: String},
	location_name: {type: String},
	image_path: {type: String},
	hearts: { type: [String]}
});


playlistSchema.statics = {
	/**
	 * Get playlist
	 * @param {ObjectId} id - The objectId of playlist.
	 * @returns {Promise<User, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.populate('user')
			.exec()
			.then((playlist) => {
				if (playlist) {
					return playlist;
				}
				const err = new APIError('No such playlist exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	},

  /**
   * List playlists in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of playlists to be skipped.
   * @param {number} limit - Limit number of playlists to be returned.
   * @returns {Promise<User[]>}
   */
	list({ skip = 0, limit = 50 } = {}) {
		return this.find()
			.sort({ createdAt: -1 })
			.skip(+skip)
			.limit(+limit)
			.populate('user')
			.exec();
	}
};


playlistSchema.index({location : "2dsphere"})
playlistSchema.index({mood : "2dsphere"})

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = {Playlist};