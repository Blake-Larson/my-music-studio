import React from 'react';
import axios from 'axios';
import useStudents from '../contexts/useStudents';
import { useNavigate } from 'react-router-dom';
import useLessons from '../contexts/useLessons';

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
								<h5 className='font-semibold'>Repertoire</h5>
								<ul className='list-disc list-inside'>
									<li>Coming soon...</li>
								</ul>
								<h5 className='font-semibold'>Concepts</h5>
								<ul className='list-disc list-inside'>
									<li>Coming soon...</li>
								</ul>
							</div>
						</div>
						<div className='flex justify-between'>
							<button
								className='btn btn-ghost hover:bg-primary border border-base-300'
								onClick={() => navigate(`/students/${student?._id}`)}
							>
								Profile
							</button>
							<button
								className='btn btn-ghost btn-square hover:bg-error border border-base-300'
								onClick={() => deleteLesson(lesson._id)}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
									/>
								</svg>
							</button>
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
