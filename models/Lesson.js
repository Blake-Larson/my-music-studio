const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	content: {
		type: String,
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
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Lesson', LessonSchema);
