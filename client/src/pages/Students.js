import React from 'react';
import CreateStudent from '../components/CreateStudent';
import StudentTable from '../components/StudentTable';
import StudentProfile from './StudentProfile';
import { Routes, Route, useLocation } from 'react-router-dom';

function Students() {
	const location = useLocation();

	return (
		<div>
			<div className='p-3 mb-3'>
				<h1 className='text-3xl text-center lg:text-start'>Students</h1>
			</div>
			{location.pathname === '/students' && (
				<div className='flex flex-col mx-3 gap-5'>
					<StudentTable />
					{location.pathname === '/students' && <CreateStudent />}
				</div>
			)}
			<Routes>
				<Route path=':id' element={<StudentProfile />}></Route>
			</Routes>
		</div>
	);
}

export default Students;
