const validator = require('validator');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Student = require('../models/Student');
const cloudinary = require('../middleware/cloudinary');

const signToken = userID => {
	return JWT.sign(
		{
			iss: 'Keyboardcat',
			sub: userID,
		},
		'Keyboardcat',
		{ expiresIn: '1h' }
	);
};

module.exports = {
	serverMessage: (req, res) => {
		res.end(
			JSON.stringify({
				message: 'Server Running...',
			})
		);
	},

	postSignup: (req, res) => {
		if (!validator.isLength(req.body.password, { min: 8 })) {
			res.status(400).json({
				message: {
					msgBody: 'Password must be at least 8 characters long.',
					msgError: true,
				},
			});
			return;
		}

		if (req.body.password !== req.body.confirmPassword) {
			res.status(400).json({
				message: {
					msgBody: 'Passwords do not match.',
					msgError: true,
				},
			});
			return;
		}

		req.body.email = validator.normalizeEmail(req.body.email, {
			gmail_remove_dots: false,
		});

		const user = new User({
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
		});

		User.findOne(
			{
				email: req.body.email,
			},
			(err, existingUser) => {
				if (err) {
					res.status(500).json({
						message: {
							msgBody: 'Error has occured during find',
							msgError: true,
							err,
						},
					});
					return;
				}
				if (existingUser) {
					res.status(400).json({
						message: {
							msgBody: 'Email already taken.',
							msgError: true,
						},
					});
					return;
				}
				user.save(err => {
					if (err) {
						res.status(500).json({
							message: {
								msgBody: 'Error has occured during save.',
								msgError: true,
								err,
							},
						});
					} else {
						res.status(201).json({
							message: {
								msgBody: 'Account successfully created!',
								msgError: false,
							},
						});
					}
				});
			}
		);
	},

	login: (req, res) => {
		if (req.isAuthenticated()) {
			const { _id, username, role } = req.user;
			const token = signToken(_id);
			res.cookie('access_token', token, { httpOnly: true, sameSite: true });
			res.status(200).json({ isAuthenticated: true, user: { username, role } });
		}
	},

	logout: (req, res) => {
		res.clearCookie('access_token');
		res.json({ user: { username: '', role: '' }, success: true });
	},

	getAuthenticated: (req, res) => {
		res.status(200).json({ isAuthenticated: true, user: req.user });
	},

	updateUser: async (req, res) => {
		console.log(req.body);
		if (req.body.profileImg !== req.body.oldImg) {
			cloudinary.uploader
				.destroy(req.body.oldImg)
				.then(result => console.log('deleted img', result));
		}
		try {
			await User.findOneAndUpdate(
				{ _id: req.body.id },
				{
					userName: req.body.userName,
					email: req.body.email,
					studioName: req.body.studioName,
					profileImg: req.body.profileImg,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated user information!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update this user.',
					msgError: true,
					err,
				},
			});
		}
	},

	deleteUser: async (req, res) => {
		try {
			await User.deleteOne({ _id: req.body.id });
			await Lesson.deleteOne({ teacher: req.body.id });
			await Student.deleteOne({ teacher: req.body.id });
			res.status(200).json({
				message: {
					msgBody: 'Deleted Account!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to delete this account.',
					msgError: true,
					err,
				},
			});
		}
	},
};
