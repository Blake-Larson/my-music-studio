import Axios from 'axios';

const LessonService = {
	updateAttendace: async (status, id) => {
		console.log(id);
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
};

export default LessonService;
