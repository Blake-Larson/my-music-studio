import React from 'react';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentTable({ currentStudent, setCurrentStudent }) {
	const { user } = useAuth();
	let navigate = useNavigate();

	const [students, setStudents] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'GET',
					data: user._id,
					url: 'http://localhost:5000/students',
					withCredentials: true,
				});
				setStudents(response.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [user._id]);

	const studentArrLarge = students
		.sort((a, b) => (a.name > b.name ? 1 : -1))
		.map((el, i) => {
			return (
				<tr key={i}>
					<td>
						<div
							className='flex items-center space-x-3 hover:cursor-pointer'
							onClick={() => {
								setCurrentStudent(el);
								navigate(`/students/studentprofile`);
							}}
						>
							<div>
								<div className='font-bold'>{el.name}</div>
							</div>
						</div>
					</td>
					<td>{el.instrument}</td>
					<td>
						<a href='tel:1-111-1111'>Phone</a>
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
								setCurrentStudent(el);
								navigate(`/students/studentprofile`);
							}}
						>
							<div>
								<div className='font-bold'>{el.name}</div>
							</div>
						</div>
					</td>

					<td>
						<a href='tel:1-111-1111'>Phone</a>
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
