const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	display_name: String,
	image_url: String,
	created_playlists: { type: Schema.Types.ObjectId, ref: 'Playlist' },
	saved_playlists: { type: Schema.Types.ObjectId, ref: 'Playlist' },
	starred_tracks: [String],
	spotify_id: String
});


UserSchema.statics = {
	/**
	 * Get user
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	get(id) {
	  return this.findById(id)
		.exec()
		.then((user) => {
		  if (user) {
			return user;
		  }
		  const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
		  return Promise.reject(err);
		});
	}
};


const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};


