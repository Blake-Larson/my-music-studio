import Axios from 'axios';

export default {
	login: async user => {
		console.log(user);
		try {
			const res = await await Axios({
				method: 'GET',
				data: {
					user: user,
				},
				url: 'http://localhost:5000/authenticated',
				withCredentials: true,
			});
			console.log('From Server:', res);
			if (response.status === 200) {
				setAuthed(true);
				setUser(response.data);
			} else {
				setAuthed(false);
				setUser({ username: '', email: '', profileImg: '' });
			}
		} catch (err) {
			console.log(err);
		}
	},
	register: async user => {
		console.log(user);
		return fetch('/user/register', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => data);
	},
	logout: async () => {
		return fetch('/logout')
			.then(res => res.json())
			.then(data => data);
	},
	isAuthenticated: async () => {
		return fetch('/user/authenticated').then(res => {
			if (res.status !== 401) return res.json().then(data => data);
			else return { isAuthenticated: false, user: { username: '', role: '' } };
		});
	},
};
