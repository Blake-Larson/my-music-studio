const Student = require('../models/Student');

module.exports = {
	getStudents: async (req, res) => {
		try {
			const students = await Student.find({ teacher: req.user.id });
			res.json(students);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to find students.',
					msgError: true,
					err,
				},
			});
		}
	},
	createStudent: async (req, res) => {
		try {
			await Student.create({
				name: req.body.name,
				age: req.body.age,
				email: req.body.email,
				instrument: req.body.instrument,
				teacher: req.user._id,
			});
			console.log('Student has been added!');
			res.json({
				message: {
					msgBody: 'Student added!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to create a new student.',
					msgError: true,
					err,
				},
			});
		}
	},
};
