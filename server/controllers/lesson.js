const Lesson = require('../models/Lesson');
const dayjs = require('dayjs');
dayjs().format();

module.exports = {
	getLessons: async (req, res) => {
		try {
			const lessons = await Lesson.find({ teacher: req.body.user._id }).sort({
				'date.dateObj': 'asc',
			});
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
	updateLesson: async (req, res) => {
		try {
			await Lesson.findOneAndUpdate(
				{ _id: req.body.id },
				{
					attendance: req.body.attendance,
					paid: req.body.paid,
					teacher: req.body.teacher,
					student: req.body.student,
					date: req.body.date,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated Lesson!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update this lesson.',
					msgError: true,
					err,
				},
			});
		}
	},
	updateAttendance: async (req, res) => {
		try {
			await Lesson.findOneAndUpdate(
				{ _id: req.body.id },
				{
					attendance: req.body.attendance,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated Attendance!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update attendance.',
					msgError: true,
					err,
				},
			});
		}
	},
	updatePayment: async (req, res) => {
		try {
			await Lesson.findOneAndUpdate(
				{ _id: req.body.id },
				{
					payment: req.body.payment,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated Payment!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update payment.',
					msgError: true,
					err,
				},
			});
		}
	},
	createLesson: async (req, res) => {
		try {
			await Lesson.create({
				teacher: req.body.teacher,
				student: req.body.student,
				date: req.body.date,
				attendance: req.body.attendance,
				payment: req.body.payment,
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
	deleteLesson: async (req, res) => {
		try {
			await Lesson.deleteOne({ _id: req.body.id });
			res.status(200).json({
				message: {
					msgBody: 'Deleted Lesson!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to delete this lesson.',
					msgError: true,
					err,
				},
			});
		}
	},
};
