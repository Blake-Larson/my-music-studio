import * as React from 'react';
import axios from 'axios';
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
