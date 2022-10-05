const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport');

router.get('/', authController.serverMessage);
router.get(
	'/logout',
	passport.authenticate('jwt', { session: false }),
	authController.logout
);
router.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	authController.getAuthenticated
);

router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	authController.login
);
router.post('/signup', authController.postSignup);

router.put('/updateUser', authController.updateUser);

router.delete('/delete', authController.deleteUser);

module.exports = router;
