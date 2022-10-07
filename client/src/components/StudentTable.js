import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStudents from '../contexts/useStudents';

function StudentTable() {
	let navigate = useNavigate();
	const { students } = useStudents();

	const studentArrLarge = students.map((el, i) => {
		return (
			<tr key={i}>
				<td>
					<div
						className='flex items-center space-x-3 hover:cursor-pointer'
						onClick={() => {
							navigate(`/students/${el._id}`);
						}}
					>
						<div>
							<div className='font-bold'>{el.name}</div>
						</div>
					</div>
				</td>
				<td>{el.instrument}</td>
				<td>
					<a href={`tel:${el.phone}`}>{el.phone}</a>
				</td>
				<td>
					<a href={`mailto:${el.email}`}>{el.email}</a>
				</td>
			</tr>
		);
	});
	const studentArrSmall = students
		.sort((a, b) => (a.name > b.name ? 1 : -1))
		.map((el, i) => {
			return (
				<tr key={i}>
					<td>
						<div
							className='flex items-center space-x-3 hover:cursor-pointer'
							onClick={() => {
								navigate(`/students/${el._id}`);
							}}
						>
							<div>
								<div className='font-bold'>{el.name}</div>
							</div>
						</div>
					</td>

					<td>
						<a href={`tel:${el.phone}`}>{el.phone}</a>
					</td>
				</tr>
			);
		});

	return (
		<div>
			<div className='hidden md:block overflow-x-auto w-full border rounded-t-xl'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Instrument</th>
							<th>Phone</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>{studentArrLarge}</tbody>
				</table>
			</div>
			<div className='overflow-x-auto w-full border rounded-t-xl md:hidden'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Phone</th>
						</tr>
					</thead>
					<tbody>{studentArrSmall}</tbody>
				</table>
			</div>
		</div>
	);
}

export default StudentTable;
