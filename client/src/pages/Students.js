import React from 'react';
import CreateStudent from '../components/CreateStudent';
import StudentTable from '../components/StudentTable';
import StudentProfile from './StudentProfile';
import { Routes, Route, useLocation } from 'react-router-dom';

function Students() {
	const [selectedStudent, setSelectedStudent] = React.useState({});
	const location = useLocation();

	return (
		<div className='mt-12 lg:mt-0'>
			<div className='flex justify-between p-5'>
				<h1 className='text-3xl text-center lg:text-start'>Students</h1>
			</div>
			{location.pathname === '/students' && (
				<div className='flex flex-col mx-3 gap-5'>
					<StudentTable
						selectedStudent={selectedStudent}
						setSelectedStudent={setSelectedStudent}
					/>
					{location.pathname === '/students' && <CreateStudent />}
				</div>
			)}
			<Routes>
				<Route
					path={`/${selectedStudent._id}`}
					element={
						<StudentProfile
							selectedStudent={selectedStudent}
							setSelectedStudent={setSelectedStudent}
						/>
					}
				></Route>
			</Routes>
		</div>
	);
}

export default Students;
