const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	display_name: String,
	image_url: String,
	created_playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
	saved_playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
	starred_tracks: [String],
	spotify_id: String
});


userSchema.statics = {
	/**
	 * Get user
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.populate('created_playlists')
			.populate('starred_playlists')
			.exec()
			.then((user) => {
				if (user) {
					return user;
				}
				const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	},

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
	list({ skip = 0, limit = 50 } = {}) {
		return this.find()
			.sort({ createdAt: -1 })
			.skip(+skip)
			.limit(+limit)
			.populate('created_playlists')
			.populate('starred_playlists')
			.exec();
	}
};


const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };


