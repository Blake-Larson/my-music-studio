const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	attendance: {
		type: String,
	},
	payment: {
		type: String,
	},
	archived: {
		type: Boolean,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student',
		required: true,
	},
	date: {
		type: Object,
		required: true,
	},
});

module.exports = mongoose.model('Lesson', LessonSchema);
