import React from 'react';
import LogoIcon from './LogoIcon';
import { useLocation } from 'react-router-dom';

function Footer() {
	const location = useLocation();
	return (
		<footer className='bg-neutral p-4 text-neutral-content fixed bottom-0 w-full'>
			<div className='flex items-center md:justify-between flex-col md:flex-row gap-3'>
				<LogoIcon />
				<p
					className={
						location.pathname === '/' ||
						location.pathname === '/login' ||
						location.pathname === '/signup'
							? 'mr-0'
							: 'md:mr-64'
					}
				>
					Copyright © 2022 - All right reserved
				</p>
			</div>
		</footer>
	);
}

export default Footer;
