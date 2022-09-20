import React from 'react';
import CreateStudent from '../components/CreateStudent';
import StudentTable from '../components/StudentTable';
import StudentProfile from './StudentProfile';
import { Routes, Route, useLocation } from 'react-router-dom';

function Students() {
	const [currentStudent, setCurrentStudent] = React.useState({});
	const location = useLocation();

	return (
		<div className='mt-12 lg:mt-0'>
			<div className='flex justify-between p-5'>
				<h1 className='text-3xl text-center lg:text-start'>Students</h1>
			</div>
			{location.pathname === '/students' && (
				<div className='flex flex-col mx-3'>
					<StudentTable
						currentStudent={currentStudent}
						setCurrentStudent={setCurrentStudent}
					/>
					{location.pathname === '/students' && <CreateStudent />}
				</div>
			)}
			<Routes>
				<Route
					path='/studentprofile'
					element={
						<StudentProfile
							currentStudent={currentStudent}
							setCurrentStudent={setCurrentStudent}
						/>
					}
				></Route>
			</Routes>
		</div>
	);
}

export default Students;
