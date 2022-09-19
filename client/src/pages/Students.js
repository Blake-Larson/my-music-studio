import React from 'react';
import useAuth from '../auth/useAuth';
import CreateStudent from '../components/CreateStudent';
import axios from 'axios';

function Students() {
	const { user } = useAuth();

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

	const studentArr = students.map((el, i) => {
		return (
			<tr key={i}>
				<th>
					<label>
						<input type='checkbox' className='checkbox' />
					</label>
				</th>
				<td>
					<div className='flex items-center space-x-3'>
						{/* <div className='avatar'>
										<div className='mask mask-squircle w-12 h-12'>
											<img
												src='/tailwind-css-component-profile-2@56w.png'
												alt='Avatar Tailwind CSS Component'
											/>
										</div>
									</div> */}
						<div>
							<div className='font-bold'>{el.name}</div>
							{/* <div className='text-sm opacity-50'>{el.age}</div> */}
						</div>
					</div>
				</td>
				<td>{el.instrument}</td>
				<td>{el.email}</td>
				<th>
					<button className='btn btn-ghost btn-xs'>details</button>
				</th>
			</tr>
		);
	});

	return (
		<div>
			<div className='flex flex-col'>
				<div className='overflow-x-auto w-full'>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>
									<label>
										<input type='checkbox' className='checkbox' />
									</label>
								</th>
								<th>Name</th>
								<th>Instrument</th>
								<th>Email</th>
								<th className=''>
									<CreateStudent />
								</th>
							</tr>
						</thead>
						<tbody>{studentArr}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Students;
