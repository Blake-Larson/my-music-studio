import * as React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import LessonService from '../services/LessonService';
import dayjs from 'dayjs';

const authContext = React.createContext();

function useLessons() {
	const [lessons, setLessons] = React.useState([]);
	const [getLessons, setGetLessons] = React.useState(false);
	const { user } = useAuth();

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'PUT',
					data: {
						user: user,
					},
					url: `${process.env.REACT_APP_API_URL}/lessons`,
					withCredentials: true,
				});
				await response.data
					.filter(el =>
						dayjs(el.date.dateObj).isBefore(
							dayjs(new Date()).format('YYYY-MM-DD')
						)
					)
					.forEach(async el => {
						!el.archived && (await LessonService.updateArchived(true, el._id));
					});
				setLessons(response.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [getLessons, user]);

	return {
		lessons,
		setLessons,
		getLessons,
		setGetLessons,
	};
}

export function LessonProvider({ children }) {
	const auth = useLessons();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function LessonConsumer() {
	return React.useContext(authContext);
}
