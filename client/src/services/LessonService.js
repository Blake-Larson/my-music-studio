import Axios from 'axios';

const LessonService = {
	updateAttendace: async (status, id) => {
		try {
			const response = await Axios({
				method: 'PUT',
				data: {
					id: id,
					attendance: status,
				},
				url: `${process.env.REACT_APP_API_URL}/lessons/updateAttendance`,
				withCredentials: true,
			});
			console.log(response);
			return 'yes';
		} catch (err) {
			console.log(err);
		}
	},
	updatePayment: async (status, id) => {
		try {
			const response = await Axios({
				method: 'PUT',
				data: {
					id: id,
					payment: status,
				},
				url: `${process.env.REACT_APP_API_URL}/lessons/updatePayment`,
				withCredentials: true,
			});
			console.log(response);
			return 'yes';
		} catch (err) {
			console.log(err);
		}
	},
	updateArchived: async (status, id) => {
		try {
			const response = await Axios({
				method: 'PUT',
				data: {
					id: id,
					archived: status,
				},
				url: `${process.env.REACT_APP_API_URL}/lessons/updateArchived`,
				withCredentials: true,
			});
			console.log(response);
			return 'yes';
		} catch (err) {
			console.log(err);
		}
	},
	deleteLesson: async id => {
		if (window.confirm('Are you sure you want to delete this lesson?')) {
			try {
				const response = await Axios({
					method: 'DELETE',
					data: {
						id: id,
					},
					url: `${process.env.REACT_APP_API_URL}/lessons/delete`,
					withCredentials: true,
				});
				console.log('From Server:', response);
			} catch (err) {
				console.log(err.response);
			}
		}
	},
};

export default LessonService;
