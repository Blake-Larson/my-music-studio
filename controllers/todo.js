const Todo = require('../models/Todo');

module.exports = {
	createTodo: async (req, res) => {
		try {
			await Todo.create({
				text: req.body.text,
				user: req.body.user,
			});
			console.log('Todo has been added!');
			res.json({
				message: {
					msgBody: 'Todo added!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to create a new todo.',
					msgError: true,
					err,
				},
			});
		}
	},
	getTodos: async (req, res) => {
		try {
			const todos = await Todo.find({ user: req.body.user });
			res.json(todos);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to find todo.',
					msgError: true,
					err,
				},
			});
		}
	},
	updateTodo: async (req, res) => {
		try {
			await Todo.findOneAndUpdate(
				{ _id: req.body.id },
				{
					text: req.body.text,
					teacher: req.body.teacher,
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated Todo!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update this todo.',
					msgError: true,
					err,
				},
			});
		}
	},
	deleteTodo: async (req, res) => {
		try {
			await Todo.deleteOne({ _id: req.body.id });
			res.status(200).json({
				message: {
					msgBody: 'Deleted Todo!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: {
					msgBody: 'Error has occured trying to delete this todo.',
					msgError: true,
					err,
				},
			});
		}
	},
};
