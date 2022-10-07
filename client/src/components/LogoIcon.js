import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo/logo.png';

function Logo() {
	return (
		<div>
			<NavLink to='/'>
				<div className='flex items-center gap-2'>
					<img
						src={logo}
						alt='logo'
						className='h-12 bg-base-100 rounded-full'
					/>
					<span className='font-lemon font-normal'>My Music Studio</span>
				</div>
			</NavLink>
		</div>
	);
}

export default Logo;
