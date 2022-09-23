const Student = require('../models/Student');
const Lesson = require('../models/Lesson');

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
				phone: req.body.phone,
				email: req.body.email,
				primaryContact: req.body.primaryContact,
				instrument: req.body.instrument,
				repertoire: req.body.repertoire,
				concepts: req.body.concepts,
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
	deleteStudent: async (req, res) => {
		try {
			await Student.deleteOne({ _id: req.body.id });
			await Lesson.deleteOne({ student: req.body.id });
			res.status(200).json({
				message: {
					msgBody: 'Deleted Student!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to delete this student.',
					msgError: true,
					err,
				},
			});
		}
	},
};
