import * as React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';

const authContext = React.createContext();

function useStudents() {
	const { user } = useAuth();
	const [students, setStudents] = React.useState([]);
	const [getStudents, setGetStudents] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'GET',
					data: user._id,
					url: 'http://localhost:5000/students',
					withCredentials: true,
				});
				setStudents(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
			} catch (err) {
				console.log(err);
			}
		})();
	}, [user._id, getStudents]);

	return {
		students,
		setStudents,
		getStudents,
		setGetStudents,
	};
}

export function StudentProvider({ children }) {
	const auth = useStudents();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function StudentConsumer() {
	return React.useContext(authContext);
}
