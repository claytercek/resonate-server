const Joi = require('joi');
const randomstring = require('randomstring');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
	NODE_ENV: Joi.string()
		.allow(['development', 'production', 'test', 'provision'])
		.default('development'),
	PORT: Joi.number()
		.default(4040),
	MONGOOSE_DEBUG: Joi.boolean()
		.when('NODE_ENV', {
			is: Joi.string().equal('development'),
			then: Joi.boolean().default(true),
			otherwise: Joi.boolean().default(false)
		}),
	MONGO_URI: Joi.string().required()
		.description('Mongo DB host uri'),
	CLIENT_ID: Joi.string().required()
		.description('Spotify client id'),
	CLIENT_SECRET: Joi.string().required()
		.description('Spotify client secret'),
	CALLBACK_URI: Joi.string().required()
		.description('Spotify callback uri'),
	ENCRYPTION_SECRET: Joi.string()
		.default(randomstring.generate(30))
}).unknown()
	.required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongooseDebug: envVars.MONGOOSE_DEBUG,
	mongo_uri: envVars.MONGO_URI,
	client_id: envVars.CLIENT_ID,
	client_secret: envVars.CLIENT_SECRET,
	callback_uri: envVars.CALLBACK_URI,
	encryption_secret: envVars.ENCRYPTION_SECRET
};

module.exports = config;