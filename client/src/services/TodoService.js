import Axios from 'axios';

const TodoService = {
	createTodo: async formData => {
		try {
			const response = await Axios({
				method: 'POST',
				data: {
					text: formData.text,
					user: formData.user,
				},
				url: `${process.env.REACT_APP_API_URL}/todos/createTodo`,
				withCredentials: true,
			});
			console.log('From Server:', response);
			return response;
		} catch (err) {
			console.log(err);
			return err;
		}
	},
	getTodos: async id => {
		try {
			const response = await Axios({
				method: 'PUT',
				data: {
					user: id,
				},
				url: `${process.env.REACT_APP_API_URL}/todos`,
				withCredentials: true,
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	},
	updateTodo: async formData => {
		try {
			const response = await Axios({
				method: 'PUT',
				data: {
					id: formData.id,
					text: formData.text,
					user: formData.user,
				},
				url: `${process.env.REACT_APP_API_URL}/todos/updateTodo`,
				withCredentials: true,
			});
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	},
	deleteTodo: async id => {
		try {
			const response = await Axios({
				method: 'DELETE',
				data: {
					id: id,
				},
				url: `${process.env.REACT_APP_API_URL}/todos/deleteTodo`,
				withCredentials: true,
			});
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	},
};

export default TodoService;
