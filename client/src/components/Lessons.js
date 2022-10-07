import React from 'react';
import axios from 'axios';
import useStudents from '../contexts/useStudents';
import { useNavigate } from 'react-router-dom';
import useLessons from '../contexts/useLessons';
import DeleteButton from './buttons/DeleteButton';
import List from './List';
import { Image } from 'cloudinary-react';
import dayjs from 'dayjs';

function Lessons() {
	const { students } = useStudents();
	const { lessons, getLessons, setGetLessons } = useLessons();

	const navigate = useNavigate();

	async function deleteLesson(lessonID) {
		if (window.confirm('Are you sure you want to delete this lesson?')) {
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

	return (
		<div className='flex flex-col gap-5 w-full max-w-2xl px-5'>
			{lessons &&
				students &&
				lessons
					.filter(el =>
						dayjs(el.date.dateObj).isAfter(
							dayjs(new Date()).format('YYYY-MM-DD')
						)
					)
					.map((lesson, i) => {
						let student = students.find(
							student => student._id === lesson.student
						);
						return (
							<div key={lesson._id}>
								<div className='collapse collapse-arrow rounded-xl border border-base-300 shadow-lg bg-base-200'>
									<input type='checkbox' />
									<div className='collapse-title'>
										<div className='text-lg font-medium flex justify-between items-center flex-col sm:flex-row gap-3'>
											<div className='flex gap-3 items-center'>
												<div className='avatar'>
													<div className='w-12 rounded'>
														<Image
															cloudName='drwljgjhd'
															publicId={
																student?.profileImg
																	? student?.profileImg
																	: 'https://res.cloudinary.com/drwljgjhd/image/upload/v1664830344/w1plcgp0zhfp0jbnykyu.jpg'
															}
														/>
													</div>
												</div>
												<span>{student?.name}</span>
											</div>

											{lesson && (
												<div className='flex text-center'>
													<div className='flex flex-col justify-evenly'>
														<span>{`${lesson.date.weekday}, ${lesson.date.date}`}</span>
														<span className='text-lg'>{`${lesson.date.start} - ${lesson.date.end}`}</span>
													</div>
												</div>
											)}
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
					})}
		</div>
	);
}

export default Lessons;
