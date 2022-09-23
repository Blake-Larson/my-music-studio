import React from 'react';
import CreateLesson from '../components/CreateLesson';
// import useAuth from '../auth/useAuth';
import Lessons from '../components/Lessons';

function Dashboard() {
	// const { user } = useAuth();
	const [getLessons, setGetLessons] = React.useState(false);

	return (
		<div>
			<div className='p-3'>
				<h1 className='text-3xl text-center lg:text-start'>Dashboard</h1>
			</div>
			<div className=''>
				<div className='flex flex-row justify-between items-center p-2'>
					<h2 className='text-xl'>Upcoming Lessons</h2>
					<CreateLesson getLessons={getLessons} setGetLessons={setGetLessons} />
				</div>
				<div className='flex flex-col items-center gap-5'>
					<Lessons getLessons={getLessons} setGetLessons={setGetLessons} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
