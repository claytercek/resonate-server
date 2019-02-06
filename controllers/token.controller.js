var url = require('url');
var request = require('request');
var encrpytion = require('../config/encryption');
var config = require("../config/config");

var spotifyEndpoint = 'https://accounts.spotify.com/api/token';

var clientId = config.client_id;
var clientSecret = config.client_secret;
var clientCallback = config.callback_uri;

var authString = new Buffer(clientId + ':' + clientSecret).toString('base64');
var authorizationHeader = 'Basic ' + authString;


function refresh(req, res, next) {
	if (!req.body.refresh_token) {
		res.status(400).json({ error: 'Refresh token is missing from body' });
		return;
	}

	var refreshToken = encrpytion.decrypt(req.body.refresh_token),
		formData = {
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		},
		options = {
			uri: url.parse(spotifyEndpoint),
			headers: {
				'Authorization': authorizationHeader
			},
			form: formData,
			method: 'POST',
			json: true
		};

	request(options, function (error, response, body) {
		if (response.statusCode === 200 && !!body.refresh_token) {
			body.refresh_token = encrpytion.encrypt(body.refresh_token);
		}

		res.status(response.statusCode);
		res.json(body);

		next();
	})
}

function swap(req, res, next) {
    var formData = {
            grant_type : 'authorization_code',
            redirect_uri : clientCallback,
            code : req.body.code
        },
        options = {
            uri : url.parse(spotifyEndpoint),
            headers : {
                'Authorization' : authorizationHeader
            },
            form : formData,
            method : 'POST',
            json : true
        };

    request(options, function (error, response, body) {
        if (response.statusCode === 200) {
            body.refresh_token = encrpytion.encrypt(body.refresh_token);
        }
        
        res.status(response.statusCode);
        res.json(body);

        next();
    });
}

module.exports = { refresh, swap };