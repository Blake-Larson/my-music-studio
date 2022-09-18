import React from 'react';
import useAuth from '../auth/useAuth';

function Dashboard() {
	const { user } = useAuth();

	return (
		<div>
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the Dashboard page. (Private)</h2>
			</div>
		</div>
	);
}

export default Dashboard;
