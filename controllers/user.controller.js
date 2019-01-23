const User = require('../models/user.model').User;


/**
 * Create new user
 * @property {string} req.body.display_name 
 * @property {string} req.body.image_url 
 * @property {string} req.body.spotify_id
 * @returns {User}
 */
function create(req, res, next) {
	const user = new User({
		display_name: req.body.display_name,
		image_url: req.body.image_url,
		spotify_id: req.body.spotify_id
	});

	user.save()
		.then(savedUser => res.json(savedUser))
		.catch(e => next(e));
}


/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
	User.get(id)
		.then((user) => {
			req.user = user; // eslint-disable-line no-param-reassign
			return next();
		})
		.catch(e => next(e));
}


/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
	return res.json(req.user);
}


/**
 * Update existing user info
 * @property {string} req.body.display_name
 * @property {string} req.body.image_url
 * @property {string} req.body.spotify_id
 * @property {string} req.body.created_playlists
 * @property {string} req.body.saved_playlists
 * @property {string} req.body.starred_tracks
 * @returns {User}
 */
function update(req, res, next) {
	const user = req.user;
	Object.assign(user, req.body)
	user.save()
		.then(savedUser => res.json(savedUser))
		.catch(e => next(e));
}


/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
	const user = req.user;
	user.remove()
		.then(deletedUser => res.json(deletedUser))
		.catch(e => next(e));
}


/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	User.list({ limit, skip })
		.then(users => res.json(users))
		.catch(e => next(e));
}


module.exports = { create, update, get, remove, load, list };