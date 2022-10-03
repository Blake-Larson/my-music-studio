import React from 'react';
import axios from 'axios';
import useStudents from '../contexts/useStudents';
import { useNavigate } from 'react-router-dom';
import useLessons from '../contexts/useLessons';
import DeleteButton from './buttons/DeleteButton';
import List from './List';

function Lessons() {
	const { students } = useStudents();
	const { lessons, getLessons, setGetLessons } = useLessons();

	const navigate = useNavigate();

	async function deleteLesson(lessonID) {
		if (window.confirm('Are you sure you want to delete this student?')) {
			try {
				const response = await axios({
					method: 'DELETE',
					data: { id: lessonID },
					url: 'http://localhost:5000/lessons/delete',
					withCredentials: true,
				});
				console.log('From Server:', response);
				setGetLessons(!getLessons);
			} catch (err) {
				console.log(err.response);
			}
		}
	}

	const lessonArr = lessons.map((lesson, i) => {
		let student = students.find(student => student._id === lesson.student);
		return (
			<div key={lesson._id}>
				<div className='collapse collapse-arrow rounded-xl border border-base-300 shadow-lg bg-base-200'>
					<input type='checkbox' />
					<div className='collapse-title'>
						<div className='text-lg font-medium flex justify-between items-center'>
							<div className='flex flex-col'>
								<span>{student?.name}</span>
								<span>{`${lesson?.date.start} - ${lesson?.date.end}`}</span>
							</div>
							<span>{lesson?.date.date}</span>
						</div>
					</div>
					<div className='collapse-content gap-5 flex flex-col bg-base-100'>
						<div className='text-lg flex flex-col p-2 rounded-xl'>
							<div>
								{student && (
									<div>
										<List arrayName={'repertoire'} student={student} />
										<List arrayName={'concepts'} student={student} />
									</div>
								)}
							</div>
						</div>
						<div className='flex justify-between'>
							<button
								className='btn btn-ghost hover:bg-primary border border-base-300'
								onClick={() => navigate(`/students/${student?._id}`)}
							>
								Profile
							</button>
							<div onClick={() => deleteLesson(lesson._id)}>
								<DeleteButton />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className='flex flex-col gap-5 w-full max-w-2xl px-5'>
			{lessons && students && lessonArr}
		</div>
	);
}

export default Lessons;
