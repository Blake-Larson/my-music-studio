import React from 'react';
import LessonService from '../services/LessonService';
import useLessons from '../contexts/useLessons';

function AttendanceAndPayment({ lesson }) {
	const { getLessons, setGetLessons } = useLessons();

	return (
		<div className='flex flex-col gap-3 rounded-lg'>
			<h3 className={lesson.attendance ? 'hidden' : 'text-lg font-semibold'}>
				Attendance
			</h3>
			<div className={lesson.attendance ? 'hidden' : 'flex gap-3'}>
				<button
					className='btn btn-primary w-28'
					onClick={async () => {
						const res = await LessonService.updateAttendace(
							'Present',
							lesson._id
						);
						if (res === 'yes') {
							setGetLessons(!getLessons);
						}
					}}
				>
					Present
				</button>
				<button
					className='btn btn-warning w-28'
					onClick={async () => {
						const res = await LessonService.updateAttendace(
							'Absent',
							lesson._id
						);
						if (res === 'yes') {
							setGetLessons(!getLessons);
						}
					}}
				>
					Absent
				</button>
			</div>

			<h3 className={lesson.payment ? 'hidden' : 'text-lg font-semibold'}>
				Payment
			</h3>
			<div className={lesson.payment ? 'hidden' : 'flex gap-3'}>
				<button
					className='btn btn-primary w-28'
					onClick={async () => {
						const res = await LessonService.updatePayment('Paid', lesson._id);
						if (res === 'yes') {
							setGetLessons(!getLessons);
						}
					}}
				>
					Paid
				</button>
				<button
					className='btn btn-warning w-28'
					onClick={async () => {
						const res = await LessonService.updatePayment(
							'Not Paid',
							lesson._id
						);
						if (res === 'yes') {
							setGetLessons(!getLessons);
						}
					}}
				>
					Not paid
				</button>
			</div>
		</div>
	);
}

export default AttendanceAndPayment;
