import React from 'react';
import useStudents from '../contexts/useStudents';
import { useNavigate } from 'react-router-dom';
import useLessons from '../contexts/useLessons';
import DeleteButton from './buttons/DeleteButton';
import StudentList from './StudentList';
import LessonList from './LessonList';
import { Image } from 'cloudinary-react';
import dayjs from 'dayjs';
import LessonService from '../services/LessonService';
import AttendanceAndPayment from './AttendanceAndPayment';

function Lessons() {
	const { students } = useStudents();
	const { lessons, getLessons, setGetLessons } = useLessons();

	const navigate = useNavigate();

	async function deleteLesson(lessonID) {
		await LessonService.deleteLesson(lessonID);
		setGetLessons(!getLessons);
	}

	return (
		<div className='flex flex-col gap-5 w-full max-w-4xl items-center'>
			<h2 className='text-xl font-semibold'>Upcoming Lessons</h2>
			{lessons &&
				students &&
				lessons
					.filter(
						el =>
							dayjs(el.date.dateObj).isAfter(
								dayjs(new Date()).format('YYYY-MM-DD')
							) && !el.archived
					)
					.map((lesson, i) => {
						let student = students.find(
							student => student._id === lesson.student
						);
						return (
							<div key={lesson._id} className='w-full'>
								<div className='collapse collapse-arrow rounded-xl shadow-lg bg-base-100'>
									<input type='checkbox' />
									<div className='collapse-title'>
										<div className='font-medium flex justify-between items-center flex-col sm:flex-row gap-3'>
											<div className='flex gap-3 items-center'>
												<div className='avatar'>
													<div className='w-12 rounded border border-secondary'>
														<Image
															cloudName='drwljgjhd'
															publicId={student?.profileImg}
														/>
													</div>
												</div>
												<span className='text-lg'>{student?.name}</span>
												{lesson.attendance && (
													<div
														className={
															lesson.attendance === 'Present'
																? 'btn btn-sm btn-primary btn-outline bg-base-100'
																: 'btn btn-sm btn-warning btn-outline bg-base-100'
														}
													>
														{lesson.attendance}
													</div>
												)}
												{lesson.payment && (
													<div
														className={
															lesson.payment === 'Paid'
																? 'btn btn-sm btn-primary btn-outline bg-base-100'
																: 'btn btn-sm btn-warning btn-outline bg-base-100'
														}
													>
														{lesson.payment}
													</div>
												)}
											</div>

											{lesson && (
												<div className='flex text-center'>
													<div className='flex flex-col justify-evenly'>
														<span>{`${lesson.date.weekday}, ${lesson.date.date}`}</span>
														<span>{`${lesson.date.start} - ${lesson.date.end}`}</span>
													</div>
												</div>
											)}
										</div>
									</div>
									<div className='collapse-content gap-5 flex flex-col bg-base-100'>
										<div className='flex flex-col py-2 rounded-xl'>
											<div>
												{student && (
													<div className='flex flex-col md:flex-row md:justify-between gap-3'>
														<StudentList
															arrayName={'repertoire'}
															student={student}
														/>
														<StudentList
															arrayName={'concepts'}
															student={student}
														/>
													</div>
												)}
											</div>
										</div>
										<div className='flex flex-col md:flex-row gap-3'>
											<div className='w-full'>
												<LessonList arrayName={'comments'} lesson={lesson} />
											</div>
											<div className='w-full'>
												<AttendanceAndPayment lesson={lesson} />
											</div>
										</div>

										<div className='flex justify-between'>
											<div className='flex gap-3 items-center'>
												<button
													className='btn btn-ghost hover:bg-primary border border-base-300'
													onClick={() => navigate(`/students/${student?._id}`)}
												>
													Profile
												</button>
											</div>
											<div className='flex gap-3'>
												<button
													className='btn btn-warning btn-outline'
													onClick={async () => {
														const res = await LessonService.updateArchived(
															true,
															lesson._id
														);
														if (res === 'yes') {
															setGetLessons(!getLessons);
														}
													}}
												>
													Archive
												</button>
												<div onClick={() => deleteLesson(lesson._id)}>
													<DeleteButton />
												</div>
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
