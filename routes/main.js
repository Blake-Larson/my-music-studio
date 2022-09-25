const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

router.put('/updateUser', authController.updateUser);

module.exports = router;
