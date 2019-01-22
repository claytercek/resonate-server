const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	display_name: String,
	image_url: String,
	created_playlists: { type: Schema.Types.ObjectId, ref: 'Playlist' },
	saved_playlists: { type: Schema.Types.ObjectId, ref: 'Playlist' }
});

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};


