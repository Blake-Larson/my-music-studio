import React from 'react';
import CreateStudent from '../components/CreateStudent';
import StudentTable from '../components/StudentTable';
import StudentProfile from './StudentProfile';
import { Routes, Route, useLocation } from 'react-router-dom';

function Students() {
	const location = useLocation();

	return (
		<div>
			<div className='p-3 mb-3 flex gap-5 items-center justify-center md:justify-start'>
				<h1 className='text-3xl font-lemon'>Students</h1>
				{location.pathname === '/students' && <CreateStudent />}
			</div>
			{location.pathname === '/students' && (
				<div className='flex flex-col mx-3 gap-5'>
					<StudentTable />
				</div>
			)}
			<Routes>
				<Route path=':id' element={<StudentProfile />}></Route>
			</Routes>
		</div>
	);
}

export default Students;
