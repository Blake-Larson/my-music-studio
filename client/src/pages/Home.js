import React from 'react';
import Nav from '../components/Nav';
import useAuth from '../auth/useAuth';

function Home() {
	const { authed } = useAuth();

	return (
		<div>
			<Nav />
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the home page. More coming soon...</h2>
				<div className='flex flex-col md:flex-row gap-10 justify-center'>
					{authed && 'You are logged in.'}
				</div>
			</div>
		</div>
	);
}

export default Home;
