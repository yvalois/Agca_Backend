const express = require('express');

const { auth, verify, saveData, buyTokens, getAllUsers} = require('../controller/userController');
const { verifyToken } = require('../config/jwt');
const MetaAuth = require('meta-auth');
const metaAuth = new MetaAuth({
    banner: 'AGCA Login Wallet'
})


const router = express.Router();

router.get('/auth/:MetaAddress',metaAuth,  auth);
router.get('/verify/:MetaMessage/:MetaSignature',metaAuth,  verify);
router.post('/savedata/:address', saveData);
router.post('/buyTokens',verifyToken,  buyTokens);
router.get('/getAllUsers',verifyToken,  getAllUsers);

module.exports = router;