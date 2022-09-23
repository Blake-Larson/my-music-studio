const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: String,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	primaryContact: {
		type: String,
	},
	instrument: {
		type: String,
	},
	repertoire: {
		type: Array,
	},
	concepts: {
		type: Array,
	},
	status: {
		type: String,
		default: 'Active',
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
