import React from 'react';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import useStudents from '../contexts/useStudents';
import dayjs from 'dayjs';

function Lessons() {
	const { user } = useAuth();
	const { students } = useStudents();
	const [lessons, setLessons] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'GET',
					data: user._id,
					url: 'http://localhost:5000/lessons',
					withCredentials: true,
				});
				setLessons(response.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [user._id]);

	const lessonArr = lessons.map((lesson, i) => {
		let student = students.find(student => student._id === lesson.student);
		return (
			<div key={i}>
				<div className='collapse collapse-arrow rounded-xl border border-base-100 shadow-xl bg-base-200'>
					<input type='checkbox' />
					<div className='collapse-title text-lg font-medium flex w-96 justify-between items-center'>
						<div className='flex flex-col'>
							<span>{student?.name}</span>
							<span>{`${lesson?.date.start} - ${lesson?.date.end}`}</span>
						</div>

						<span>{lesson?.date.date}</span>
					</div>
					<div className='collapse-content'>
						<div className='text-lg flex flex-col bg-base-100 p-2 rounded-xl'>
							<span>Primary Contact:</span>
							<span>Phone:</span>
							<span>Email:</span>
							<span>School:</span>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className='flex flex-col gap-5'>
			{lessons && students && lessonArr}
		</div>
	);
}

export default Lessons;
