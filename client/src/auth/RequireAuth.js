import React from 'react';
//import { Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useAuth from './useAuth';
import Nav from '../components/Nav';

export const RequireAuth = ({ children }) => {
	const { authed, user } = useAuth();
	// const location = useLocation();

	// return authed === true ? (
	// 	children
	// ) : (
	// 	<Navigate to='/' replace state={{ path: location.pathname }} />
	// );
	return (
		<div>
			<Nav />
			<div className='drawer drawer-mobile'>
				<input id='drawer' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col items-center justify-center'>
					{/* <!-- Page content here --> */}
					{authed ? (
						children
					) : (
						<div>
							<h1>Loading... Try Logging In.</h1>
						</div>
					)}
					<label
						htmlFor='drawer'
						className='btn btn-square btn-ghost drawer-button lg:hidden fixed top-14 left-3'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							className='inline-block w-5 h-5 stroke-current'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h16'
							></path>
						</svg>
					</label>
				</div>
				<div className='drawer-side'>
					<label htmlFor='drawer' className='drawer-overlay'></label>
					<ul className='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
						{/* <!-- Sidebar content here --> */}
						<li>
							<NavLink to='/dashboard'>Dashboard</NavLink>
						</li>
						<li>
							<NavLink to='/students'>Students</NavLink>
						</li>
					</ul>
					<div className='flex flex-col'>
						<span>Authenticated as {user.userName}</span>
						<span>ID: {user._id}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
