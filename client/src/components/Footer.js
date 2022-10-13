import React from 'react';
import LogoIcon from './LogoIcon';

function Footer() {
	return (
		<footer className='bg-neutral p-4 mt-auto w-full text-base-100'>
			<div className='flex items-center md:justify-between flex-col md:flex-row gap-3'>
				<LogoIcon />

				<a
					href='https://blakelarson.dev/'
					className='text-center btn btn-outline normal-case btn-primary btn-sm'
				>
					More work by Blake Larson
				</a>
				<p>Copyright © 2022 - All right reserved</p>
			</div>
		</footer>
	);
}

export default Footer;
