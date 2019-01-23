const Playlist = require('../models/playlist.model').Playlist;
const UserCtr = require('./user.controller');

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
				res.json(populatedPlist)
				
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
 * @property {obj} req.body.location
 * @property {obj} req.body.tracks
 * @property {obj} req.body.mood
 * @returns {Playlist}
 */
function update(req, res, next) {
	const playlist = req.playlist;
		playlist.title = req.body.title,
		playlist.user = req.body.user,
		playlist.description = req.body.description,
		playlist.tags = req.body.tags,
		playlist.location = req.body.location,
		playlist.tracks = req.body.tracks,
		playlist.mood = req.body.mood

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