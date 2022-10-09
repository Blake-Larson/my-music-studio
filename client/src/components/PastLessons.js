import React from 'react';
import SmallCancelButton from './buttons/SmallCancelButton';
import SmallCheckButton from './buttons/SmallCheckButton';
import EditButton from './buttons/EditButton';
import useLessons from '../contexts/useLessons';
import LessonService from '../services/LessonService';

function PastLessons({ pastLessons }) {
	const [editMode, setEditMode] = React.useState(false);
	const { getLessons, setGetLessons } = useLessons();

	function handleEditMode(i) {
		setEditMode(!editMode);
	}

	return (
		<div>
			<h3 className='text-lg font-semibold'>Past Lessons</h3>
			<div className='overflow-x-auto w-full border rounded-t-xl table-compact'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>Date</th>
							<th>Day</th>
							<th>Time</th>
							<th>Attendance</th>
							<th>Paid</th>
						</tr>
					</thead>
					<tbody>
						{pastLessons.map((lesson, i) => {
							return (
								<tr key={i}>
									<td>{lesson.date.date}</td>
									<td>{lesson.date.weekday}</td>
									<td>{`${lesson.date.start} - ${lesson.date.end}`}</td>
									<td onClick={() => handleEditMode(i)}>
										{editMode ? (
											<div className='flex gap-2'>
												<button
													className='btn btn-primary btn-xs'
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
													className='btn btn-warning btn-xs'
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
										) : (
											<div className='flex group gap-2'>
												<div>{lesson.attendance}</div>
												<div
													className='group-hover:opacity-100 opacity-0 transition-opacity duration-500'
													onClick={() => setEditMode(!editMode)}
												>
													<EditButton
														width={'4'}
														height={'4'}
														padding={'0.5'}
													/>
												</div>
											</div>
										)}
									</td>
									<td onClick={() => handleEditMode(i)}>
										{editMode ? (
											<div className='flex gap-2'>
												<button
													className='btn btn-primary btn-xs'
													onClick={async () => {
														const res = await LessonService.updatePayment(
															'Paid',
															lesson._id
														);
														if (res === 'yes') {
															setGetLessons(!getLessons);
														}
													}}
												>
													Paid
												</button>
												<button
													className='btn btn-warning btn-xs'
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
										) : (
											<div className='flex group gap-2'>
												<div>{lesson.payment}</div>
												<div
													className='group-hover:opacity-100 opacity-0 transition-opacity duration-500'
													onClick={() => setEditMode(!editMode)}
												>
													<EditButton
														width={'4'}
														height={'4'}
														padding={'0.5'}
													/>
												</div>
											</div>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PastLessons;
