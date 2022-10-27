import React from 'react';
import LogoIcon from './LogoIcon';

function Footer() {
	return (
		<footer className='bg-neutral p-4 mt-auto w-full text-base-100 custom-10vh grid md:grid-cols-3 items-center grid-cols-1'>
			<LogoIcon />
			<div>
				<a
					href='https://blakelarson.dev/'
					className='text-center btn btn-outline normal-case btn-primary btn-sm'
				>
					More work by Blake Larson
				</a>
			</div>
			<p className='md:text-end text-center'>
				Copyright © 2022 - All right reserved
			</p>
		</footer>
	);
}

export default Footer;
