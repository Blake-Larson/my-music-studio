import React from 'react';

function PastLessons({ student, pastLessons }) {
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
									<td>{lesson.attendance}</td>
									<td>{lesson.payment}</td>
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
