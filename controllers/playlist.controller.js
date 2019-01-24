const Playlist = require('../models/playlist.model').Playlist;
const User = require('../models/user.model').User;

/**
 * Create new playlist
 * @property {string} req.body.title
 * @property {string} req.body.user
 * @property {string} req.body.description
 * @property {[string]} req.body.tags
 * @property {obj} req.body.location
 * @property {obj} req.body.tracks
 * @property {obj} req.body.mood
 * @returns {Playlist}
 */
function create(req, res, next) {
	const playlist = new Playlist({
		title: req.body.title,
		user: req.body.user,
		description: req.body.description,
		tags: req.body.tags,
		location: req.body.location,
		tracks: req.body.tracks,
		mood: req.body.mood
	});

	playlist.save()
		.then(savedPlaylist => {
			Playlist.populate(savedPlaylist, {path:"user"}, (err, populatedPlist) => {
				let creator = populatedPlist.user;
				let newCreatedList = creator.created_playlists.push(savedPlaylist.id) 
				populatedPlist.user.created_playlists = newCreatedList;
				console.log(creator._id)

				User.findOneAndUpdate({_id: creator.id}, { $push: {created_playlists: savedPlaylist.id}}, (err, doc) => {
					if (err) {
						console.log(err);
					} else {
						res.json(populatedPlist);
					}
					console.log(doc);
				});
			})
		})
		.catch(e => next(e));
}


/**
 * Load playlist and append to req.
 */
function load(req, res, next, id) {
	Playlist.get(id)
		.then((playlist) => {
			req.playlist = playlist; // eslint-disable-line no-param-reassign
			return next();
		})
		.catch(e => next(e));
}


/**
 * Get playlist
 * @returns {Playlist}
 */
function get(req, res) {
	return res.json(req.playlist);
}


/**
 * Update existing playlist info
 * @property {string} req.body.title
 * @property {string} req.body.user
 * @property {string} req.body.description
 * @property {[string]} req.body.tags
 * @property {object} req.body.location
 * @property {object} req.body.tracks
 * @property {object} req.body.mood
 * @returns {Playlist}
 */
function update(req, res, next) {
	const playlist = req.playlist;
	Object.assign(playlist, req.body)

	playlist.save()
		.then(savedPlaylist => res.json(savedPlaylist))
		.catch(e => next(e));
}


/**
 * Delete playlist.
 * @returns {Playlist}
 */
function remove(req, res, next) {
	const playlist = req.playlist;
	playlist.remove()
		.then(deletedPlaylist => res.json(deletedPlaylist))
		.catch(e => next(e));
}


/**
 * Get playlist list.
 * @property {number} req.query.skip - Number of playlists to be skipped.
 * @property {number} req.query.limit - Limit number of playlists to be returned.
 * @returns {Playlist[]}
 */
function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	Playlist.list({ limit, skip })
		.then(playlists => res.json(playlists))
		.catch(e => next(e));
}


module.exports = { create, update, get, remove, load, list };