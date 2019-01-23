const mongoose = require('mongoose');
const util = require('util');

const config = require('./config/config');
const app = require('./config/express');
const debug = require('debug');

const mongoUri = config.mongo_uri;
mongoose.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true });
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
	mongoose.set('debug', (collectionName, method, query, doc) => {
		debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
	});
}

app.listen(config.port, () => {
	console.info(`server started on port ${config.port} (${config.env})`);
})

module.exports = app;