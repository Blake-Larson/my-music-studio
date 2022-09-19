import React from 'react';
import useAuth from '../auth/useAuth';
import axios from 'axios';

function Lesson() {
	const { user } = useAuth();
	const [students, setStudents] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'GET',
					data: user._id,
					url: 'http://localhost:5000/students',
					withCredentials: true,
				});
				console.log('From Server:', response);
				if (response.status === 200) {
					setStudents(response.data);
				} else {
					// setAuthed(false);
					// setUser({});
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [user._id]);

	return <div>Lesson</div>;
}

export default Lesson;
