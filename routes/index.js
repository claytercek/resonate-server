const express = require('express');
const userRoutes = require("./user.route");
const playlistRoutes = require("./playlist.route");

const router = express.Router();

router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);

module.exports = router;