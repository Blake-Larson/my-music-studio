import * as React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import useAuth from '../auth/useAuth';

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
				const filteredLessons = response.data.filter(el =>
					dayjs(el.date.dateObj).isAfter(dayjs(new Date()).format('YYYY-MM-DD'))
				);
				setLessons(filteredLessons);
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
