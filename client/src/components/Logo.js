import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo/logo.png';
import useAuth from '../auth/useAuth';

function Logo() {
	const location = useLocation();
	const { user } = useAuth();
	return (
		<div
			className={
				location.pathname === '/' ||
				location.pathname === '/login' ||
				location.pathname === '/signup'
					? 'btn btn-ghost normal-case text-xl h-12'
					: 'btn btn-ghost normal-case text-xl h-20'
			}
		>
			<NavLink to='/'>
				<div className='flex items-center gap-2'>
					<img src={logo} alt='logo' className='h-12' />
					<span className='font-lemon font-normal'>
						{user?.studioName ? user?.studioName : 'My Music Studio'}
					</span>
				</div>
			</NavLink>
		</div>
	);
}

export default Logo;
