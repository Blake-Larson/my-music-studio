import React from 'react';
import CreateLesson from '../components/CreateLesson';
import Lessons from '../components/Lessons';
import Todos from '../components/Todos';

function Dashboard() {
	return (
		<div className=''>
			<div className='p-3 flex gap-5 items-center justify-center md:justify-start sticky z-50 bg-base-100 w-full border-b border-base-100 border-b-base-200 top-0'>
				<h1 className='text-2xl font-lemon'>Dashboard</h1>
				<CreateLesson />
			</div>
			<div className='flex gap-5 2xl:flex-row p-5 items-center 2xl:items-start flex-col-reverse justify-evenly'>
				<Lessons />
				<Todos />
			</div>
		</div>
	);
}

export default Dashboard;
