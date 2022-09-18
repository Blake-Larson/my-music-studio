import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import SignUp from './SignUp';
import Login from './Login';

function Nav() {
	const location = useLocation();

	const { authed, handleLogout } = useAuth();

	return (
		<nav className='navbar bg-base-100'>
			<div className='flex-1'>
				<div className='btn btn-ghost normal-case text-xl'>
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
						<label htmlFor='login-modal' className='btn modal-button'>
							Login
						</label>
						<input type='checkbox' id='login-modal' className='modal-toggle' />
						<label htmlFor='login-modal' className='modal cursor-pointer'>
							<label>
								<Login />
							</label>
						</label>

						<label htmlFor='signup-modal' className='btn modal-button'>
							Sign Up!
						</label>
						<input type='checkbox' id='signup-modal' className='modal-toggle' />
						<label htmlFor='signup-modal' className='modal cursor-pointer'>
							<label>
								<SignUp />
							</label>
						</label>
					</div>
				)}
				{authed && (
					<button
						type='button'
						onClick={handleLogout}
						className='btn btn-neutral'
					>
						Sign Out
					</button>
				)}
			</div>
		</nav>
	);
}

export default Nav;
