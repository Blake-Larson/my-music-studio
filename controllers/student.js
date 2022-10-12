const Student = require('../models/Student');
const Lesson = require('../models/Lesson');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
	getStudents: async (req, res) => {
		try {
			const students = await Student.find({
				teacher: req.session?.passport?.user,
			});
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
				repertoire: req.body.repertoire,
				concepts: req.body.concepts,
				teacher: req.body.teacher,
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
		if (req.body.profileImg !== req.body.oldImg) {
			cloudinary.uploader
				.destroy(req.body.oldImg)
				.then(result => console.log('deleted img', result));
		}
		try {
			await Student.findOneAndUpdate(
				{ _id: req.body.id },
				{
					name: req.body.name,
					age: req.body.age,
					phone: req.body.phone,
					email: req.body.email,
					status: req.body.status,
					primaryContact: req.body.primaryContact,
					instrument: req.body.instrument,
					repertoire: req.body.repertoire,
					concepts: req.body.concepts,
					teacher: req.session.passport.user,
					profileImg: req.body.profileImg,
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
