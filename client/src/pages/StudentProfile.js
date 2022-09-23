import React from 'react';
import useStudents from '../contexts/useStudents';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentProfile({ selectedStudent, setSelectedStudent }) {
	const { getStudents, setGetStudents } = useStudents();
	const navigate = useNavigate();

	async function deleteLesson(studentID) {
		try {
			const response = await axios({
				method: 'DELETE',
				data: { id: studentID },
				url: 'http://localhost:5000/students/delete',
				withCredentials: true,
			});
			console.log('From Server:', response);
			setGetStudents(!getStudents);
			navigate('/students');
		} catch (err) {
			console.log(err.response);
		}
	}

	return (
		<div>
			{selectedStudent ? (
				<div className='bg-base-200 p-5 rounded mx-5 custom-80vh text-xl '>
					<div className='flex flex-col gap-5'>
						<div className='flex gap-3'>
							<div className='avatar'>
								<div className='w-24 rounded'>
									<img
										src='https://placeimg.com/192/192/people'
										alt='student profile'
									/>
								</div>
							</div>
							<div className='flex flex-col justify-evenly'>
								<h3 className='text-2xl'>{selectedStudent.name}</h3>
								<div className='flex justify-between'>
									<span>{selectedStudent.age}</span>
									<span>{selectedStudent.instrument}</span>
								</div>
							</div>
						</div>
						<div className='divider'></div>
						<div className='flex justify-evenly md:w-full text-center'>
							<div className='flex flex-col justify-evenly'>
								<span className='text-sm'>Next Lesson:</span>
								<span>{selectedStudent.instrument}</span>
							</div>
							<div className='flex flex-col justify-evenly'>
								<span className='text-sm'>Payment Status:</span>
								<span>{selectedStudent.instrument}</span>
							</div>
						</div>
						<div className='collapse collapse-arrow rounded-xl'>
							<input type='checkbox' />
							<div className='collapse-title text-lg font-medium'>
								Contact Information
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
						<div className='collapse collapse-arrow rounded-xl'>
							<input type='checkbox' />
							<div className='collapse-title text-lg font-medium'>
								Lesson Schedule
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
					<button
						className='btn btn-ghost btn-square'
						onClick={() => deleteLesson(selectedStudent._id)}
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
			) : (
				<span>No Student Selected</span>
			)}
		</div>
	);
}

export default StudentProfile;
