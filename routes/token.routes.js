const express = require('express');
const tokenCtrl = require('../controllers/token.controller');
const router = express.Router();

/** POST /api/token/swap - swap auth token */
router.post('/swap',  tokenCtrl.swap)

/** POST /api/token/refresh - refresh auth token */
router.post('/refresh',  tokenCtrl.refresh)

module.exports = router;