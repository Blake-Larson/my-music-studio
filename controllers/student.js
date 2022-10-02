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
					msgBody: 'Error has occured when trying to find students.',
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
				repertoire: [],
				concepts: [],
				teacher: req.user._id,
			});
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
					msgBody: 'Error has occured when trying to create a new student.',
					msgError: true,
					err,
				},
			});
		}
	},
	updateStudent: async (req, res) => {
		try {
			await Student.findOneAndUpdate(
				{ _id: req.body.id },
				{
					name: req.body.name,
					age: req.body.age,
					phone: req.body.phone,
					email: req.body.email,
					primaryContact: req.body.primaryContact,
					instrument: req.body.instrument,
					repertoire: req.body.repertoire,
					concepts: req.body.concepts,
					teacher: req.user._id,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated Student!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update this student.',
					msgError: true,
					err,
				},
			});
		}
	},
	updateListItem: async (req, res) => {
		try {
			await Student.findOneAndUpdate(
				{ _id: req.body.id },
				{
					[req.body.list]: req.body.newArr,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated List!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update this item.',
					msgError: true,
					err,
				},
				s,
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
					msgBody: 'Error has occured when trying to delete this student.',
					msgError: true,
					err,
				},
			});
		}
	},
};