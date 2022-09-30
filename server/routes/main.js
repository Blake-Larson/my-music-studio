const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', authController.serverMessage);
router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

router.put('/updateUser', authController.updateUser);

router.delete('/delete', authController.deleteUser);

module.exports = router;
