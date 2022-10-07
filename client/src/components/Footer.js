import React from 'react';
import LogoIcon from './LogoIcon';

function Footer() {
	return (
		<footer className='bg-neutral p-4 text-neutral-content mt-auto w-full'>
			<div className='flex items-center md:justify-between flex-col md:flex-row gap-3'>
				<LogoIcon />
				<p>Copyright © 2022 - All right reserved</p>
			</div>
		</footer>
	);
}

export default Footer;
