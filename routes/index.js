const express = require('express');
const userRoutes = require("./user.routes");
const playlistRoutes = require("./playlist.routes");
const search = require("./search.routes");
const token = require("./token.routes");

const router = express.Router();

router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);
router.use('/search', search);
router.use('/token', token);

module.exports = router;