const express = require('express');
const playlistCtrl = require('../controllers/playlist.controller');

const router = express.Router();

router.route('/location')
	/** GET /search/location/ - get list of users closest to location */
	.get(playlistCtrl.locSearch)


module.exports = router;