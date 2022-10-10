import React from 'react';
import CreateLesson from '../components/CreateLesson';
import Lessons from '../components/Lessons';
import Todos from '../components/Todos';

function Dashboard() {
	return (
		<div>
			<div className='p-3 mb-3 flex gap-5 items-center justify-center md:justify-start'>
				<h1 className='text-3xl font-lemon'>Dashboard</h1>
				<CreateLesson />
			</div>
			<div className='flex gap-5 lg:flex-row px-5 items-center lg:items-start flex-col-reverse justify-evenly'>
				<Lessons />
				<Todos />
			</div>
		</div>
	);
}

export default Dashboard;
