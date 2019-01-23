const User = require('../models/user.model');


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
 * @returns {User}
 */
function update(req, res, next) {
	const user = req.user;
	user.display_name = req.body.display_name
	user.image_url = req.body.image_url
	user.spotify_id = req.body.spotify_id

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


module.exports = { create, update, get, remove };