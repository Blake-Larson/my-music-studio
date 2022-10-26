import React from 'react';
import CreateStudent from '../components/CreateStudent';
import StudentTable from '../components/StudentTable';
import StudentProfile from './StudentProfile';
import { Routes, Route, useLocation } from 'react-router-dom';

function Students() {
	const location = useLocation();

	return (
		<div>
			<div className='p-3 flex gap-5 items-center justify-center lg:justify-start sticky z-50 w-full border-b border-l border-base-200 top-0 bg-base-100'>
				<h1 className='text-2xl font-lemon'>Students</h1>
				{location.pathname === '/students' && <CreateStudent />}
			</div>
			{location.pathname === '/students' && (
				<div className='flex flex-col p-5 gap-5'>
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
