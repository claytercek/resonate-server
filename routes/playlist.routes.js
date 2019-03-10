const express = require("express");
const playlistCtr = require("../controllers/playlist.controller");
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router
	.route("/")
	/** POST /api/playlists - Create new playlist */
	.post(playlistCtr.create)

	/** GET /api/playlists - Get list of playlists */
	.get(playlistCtr.list);


router
	.route("/:playlistId")
	/** GET /api/playlists/:playlistId - Get playlist */
	.get(playlistCtr.get)

	/** PUT /api/playlists/:playlistId - Update playlist */
	.put(playlistCtr.update)

	/** DELETE /api/playlists/:playlistId - Delete playlist */
	.delete(playlistCtr.remove);


router
	.route("/heart/:playlistId/:userId")
	/** GET /api/playlists/heart/:userId/:playlistId - Toggle user hearting a specific playlist */
	.get(playlistCtr.heart);


/** Load playlist when API with playlistId route parameter is hit */
router.param("playlistId", playlistCtr.load);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
