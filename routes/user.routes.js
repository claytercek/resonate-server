const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
	/** POST /api/users - Create new user */
	.post(userCtrl.create)

	/** GET /api/users - Get list of users */
	.get(userCtrl.list)

router.route('/:userId')
	/** GET /api/users/:userId - Get user */
	.get(userCtrl.get)

	/** PUT /api/users/:userId - Update user */
	.put(userCtrl.update)

	/** DELETE /api/users/:userId - Delete user */
	.delete(userCtrl.remove);


router.route('/spotify/:spotifyID')
	/** GET /api/users/spotify/:spotifyID - Get user by spotify ID */
	.get(userCtrl.getSpotify)



/** Load user when API with spotifyID route parameter is hit */
router.param('spotifyID', userCtrl.loadSpotify);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);



module.exports = router;