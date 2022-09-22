import React from 'react';
import CreateLesson from '../components/CreateLesson';
// import useAuth from '../auth/useAuth';
import Lessons from '../components/Lessons';

function Dashboard() {
	// const { user } = useAuth();

	return (
		<div className='mt-12 lg:mt-0'>
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the Dashboard page. (Private)</h2>
				<CreateLesson />
				<Lessons />
			</div>
		</div>
	);
}

export default Dashboard;
