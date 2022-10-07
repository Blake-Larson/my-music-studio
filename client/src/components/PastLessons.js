import React from 'react';

function PastLessons({ student, allLessons }) {
	return (
		<div>
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
						{allLessons.map((lesson, i) => {
							return (
								<tr key={i}>
									<td>{lesson.date.date}</td>
									<td>{lesson.date.weekday}</td>
									<td>{`${lesson.date.start} - ${lesson.date.end}`}</td>
									<td></td>
									<td></td>
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
