const mongoose = require('mongoose');

var opts = {keepAlive: 1, useNewUrlParser: true};

mongoose.connect(process.env.MONGO_URI, opts);

const Playlist = require('./models/playlist.model').Playlist;
const User = require('./models/user.model').User;