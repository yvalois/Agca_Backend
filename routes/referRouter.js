const express = require('express');
const router = express.Router();
const { signInByRefer, createReferCode, getReferAccount } = require('../controller/referController');
const { verifyToken } = require('../config/jwt');

router.post('/signInByRefer', verifyToken, signInByRefer);
router.post('/createReferCode', verifyToken, createReferCode);
router.get('/getReferAccount/:referCode', getReferAccount);

module.exports = router;

