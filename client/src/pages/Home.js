import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import mainBg from '../assets/images/main-bg.jpg';
import useAuth from '../auth/useAuth';
import Footer from '../components/Footer';
import Card from '../components/Card';
import YoutubeEmbed from '../components/YoutubeEmbed';

function Home() {
	const { authed } = useAuth();
	const navigate = useNavigate();

	return (
		<div className='min-h-screen flex flex-col'>
			<Nav />
			<div className='flex flex-col p-3 items-center md:flex-row md:p-0 border-b border-base-200'>
				<div className='flex flex-col p-3 items-center gap-5 md:w-1/2 '>
					<h1 className='text-3xl font-bold text-center md:text-4xl'>
						Enrich your teaching{' '}
						<span className='text-primary'>experience</span>
					</h1>
					<p className='text-center max-w-4xl'>
						You can create your own account or log in using "demo@demo.com" with
						password "demodemo" to see an example account.
					</p>
					<button
						className='btn btn-primary normal-case w-60 mt-3'
						onClick={() =>
							authed ? navigate('/dashboard') : navigate('/signup')
						}
					>
						Get started
					</button>
				</div>
				<div className='m-5 md:w-1/2 md:m-0'>
					<img
						src={mainBg}
						alt='guitars and pianos'
						className='rounded md:rounded-none'
					/>
				</div>
			</div>
			<div className='md:py-20 bg-secondary-light px-5 py-10'>
				<Card />
			</div>
			<div className='py-20 px-2'>
				<YoutubeEmbed embedId={'WXCoNu3Z1Q8'} />
			</div>
			<Footer />
		</div>
	);
}

export default Home;
