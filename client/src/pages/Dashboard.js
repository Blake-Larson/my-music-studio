import React from 'react';
import CreateLesson from '../components/CreateLesson';
import Lessons from '../components/Lessons';

function Dashboard() {
	return (
		<div>
			<div className='p-3'>
				<h1 className='text-3xl text-center lg:text-start'>Dashboard</h1>
			</div>
			<div className=''>
				<div className='flex flex-row justify-between items-center p-2'>
					<h2 className='text-xl'>Upcoming Lessons</h2>
					<CreateLesson />
				</div>
				<div className='flex flex-col items-center gap-5'>
					<Lessons />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
