import React from 'react';
// import useAuth from '../auth/useAuth';
import Lesson from '../components/Lesson';

function Dashboard() {
	// const { user } = useAuth();

	return (
		<div className='mt-12 lg:mt-0'>
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the Dashboard page. (Private)</h2>
				<Lesson />
			</div>
		</div>
	);
}

export default Dashboard;
