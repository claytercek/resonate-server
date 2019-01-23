const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
	/** POST /api/users - Create new user */
	.post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
	/** GET /api/users/:userId - Get user */
	.get(userCtrl.get)

	/** PUT /api/users/:userId - Update user */
	.put(validate(paramValidation.updateUser), userCtrl.update)

	/** DELETE /api/users/:userId - Delete user */
	.delete(userCtrl.remove);

