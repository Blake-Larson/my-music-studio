const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	content: {
		type: String,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Lesson', LessonSchema);
