import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Logo from './Logo';

function Nav() {
	const location = useLocation();

	const { authed, handleLogout } = useAuth();

	return (
		<nav className='navbar bg-base-100 border border-base-200'>
			<div className='flex-1'>
				<Logo />
			</div>
			{authed && location.pathname === '/' && (
				<div className='flex gap-5'>
					<NavLink to='/dashboard' className='hidden md:flex'>
						Dashboard
					</NavLink>
					<button
						type='button'
						onClick={handleLogout}
						className='btn btn-primary flex gap-2 normal-case'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
							/>
						</svg>
						Sign Out
					</button>
				</div>
			)}
			{!authed && (
				<div className='hidden md:flex'>
					<div className='flex gap-5 items-center'>
						<NavLink to='/login' className=''>
							Login
						</NavLink>
						<NavLink to='/signup' className='btn btn-primary normal-case'>
							Sign Up
						</NavLink>
					</div>
				</div>
			)}

			<div className='dropdown dropdown-end md:hidden'>
				<label tabIndex={0} className='btn btn-ghost'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				</label>
				{authed && (
					<ul
						tabIndex={0}
						className='dropdown-content bg-base-100 menu p-2 shadow-lg rounded-box w-36 items-end'
					>
						<li className='text-lg'>
							<NavLink to='/dashboard'>Dashboard</NavLink>
						</li>
						<li className='text-lg'>
							<button
								type='button'
								onClick={handleLogout}
								className='btn btn-neutral flex gap-2'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
									/>
								</svg>
								Sign Out
							</button>
						</li>
					</ul>
				)}
				{!authed && (
					<ul
						tabIndex={0}
						className='dropdown-content bg-base-100 menu p-2 shadow-lg rounded-box w-32 items-end'
					>
						<li className='text-lg'>
							<NavLink to='/login'>Login</NavLink>
						</li>
						<li className='text-lg'>
							<NavLink to='/signup'>Sign Up</NavLink>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
}

export default Nav;
