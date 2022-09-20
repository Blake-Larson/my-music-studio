import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import SignUp from './SignUp';
import Login from './Login';

function Nav() {
	const location = useLocation();

	const { authed } = useAuth();

	return (
		<nav className='navbar bg-base-100'>
			<div className='flex-1'>
				<div
					className={
						location.pathname !== '/'
							? 'btn btn-ghost normal-case text-xl ml-10'
							: 'btn btn-ghost normal-case text-xl'
					}
				>
					<NavLink to='/'>My Music Studio</NavLink>
				</div>
				{authed && location.pathname === '/' && (
					<div className='btn btn-ghost normal-case text-xl'>
						<NavLink to='/dashboard'>Dashboard</NavLink>
					</div>
				)}
			</div>
			<div className='flex-none'>
				{!authed && (
					<div className='flex gap-2'>
						<Login />
						<SignUp />
					</div>
				)}
			</div>
		</nav>
	);
}

export default Nav;
