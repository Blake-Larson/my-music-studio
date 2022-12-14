import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import Logo from './Logo';
import axios from 'axios';
import SignOut from './buttons/SignOut';

function Nav() {
	const location = useLocation();
	let navigate = useNavigate();
	const { authed, handleLogin } = useAuth();

	async function demoLogin() {
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email: 'demo@demo.com',
					password: 'demodemo',
				},
				url: `${process.env.REACT_APP_API_URL}/login`,
				withCredentials: true,
			});
			console.log('From Server:', response.data.user);
			handleLogin(response.data.user);
			navigate('/dashboard');
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<nav className='navbar bg-base-100 border border-base-200'>
			<div className='flex-1'>
				<Logo />
			</div>
			{authed && location.pathname === '/' && (
				<div className='gap-3 hidden md:flex'>
					<NavLink to='/dashboard' className='btn btn-secondary'>
						Dashboard
					</NavLink>
					<SignOut color={'nuetral'} textColor={'nuetral'} />
				</div>
			)}
			{!authed && (
				<div className='hidden md:flex'>
					<div className='flex gap-5 items-center'>
						<button
							onClick={demoLogin}
							className='btn btn-secondary normal-case'
						>
							Demo
						</button>
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
						className='dropdown-content bg-base-100 menu p-2 shadow-lg rounded-box w-40 items-end'
					>
						<li className='text-lg'>
							<NavLink to='/dashboard'>Dashboard</NavLink>
						</li>
						<li className='text-lg'>
							<SignOut color={'nuetral'} textColor={'nuetral'} />
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
