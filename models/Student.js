const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: String,
	},
	email: {
		type: String,
	},
	instrument: {
		type: String,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Student', StudentSchema);
