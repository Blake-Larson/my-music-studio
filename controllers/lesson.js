const Lesson = require('../models/Lesson');

module.exports = {
	getLessons: async (req, res) => {
		try {
			const lessons = await Lesson.find({ teacher: req.user.id });
			res.json(lessons);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to find lessons.',
					msgError: true,
					err,
				},
			});
		}
	},
	createLesson: async (req, res) => {
		try {
			await Lesson.create({
				name: req.body.name,
				age: req.body.age,
				email: req.body.email,
				instrument: req.body.instrument,
				teacher: req.user._id,
			});
			console.log('Lesson has been added!');
			res.json({
				message: {
					msgBody: 'Lesson added!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to create a new lesson.',
					msgError: true,
					err,
				},
			});
		}
	},
};
