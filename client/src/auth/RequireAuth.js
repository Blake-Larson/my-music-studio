import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import Nav from '../components/Nav';
import { StudentProvider } from '../contexts/useStudents';
import { LessonProvider } from '../contexts/useLessons';
import Logo from '../components/Logo';

export const RequireAuth = ({ children }) => {
	const { authed, user, handleLogout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	React.useEffect(() => {
		const clear = setTimeout(() => {
			!authed && navigate('/login');
		}, 1500);

		return () => clearTimeout(clear);
	}, [authed, navigate]);

	// return authed === true ? (
	// 	children
	// ) : (
	// 	<Navigate to='/' replace state={{ path: location.pathname }} />
	// );
	return (
		<div>
			{location.pathname === '/' && <Nav />}
			<div className='drawer drawer-mobile'>
				<input id='drawer' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col'>
					{/* <!-- Page content here --> */}
					{authed ? (
						<StudentProvider>
							<LessonProvider>
								<div>{children}</div>
							</LessonProvider>
						</StudentProvider>
					) : (
						<div className='flex justify-center mt-10'>
							<button className='btn loading'>loading</button>
						</div>
					)}
					<label
						htmlFor='drawer'
						className='btn btn-square drawer-button lg:hidden fixed top-2 left-2 z-50 opacity-60 hover:opacity-100'
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
								d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
							/>
						</svg>
					</label>
				</div>
				<div className='drawer-side'>
					<label htmlFor='drawer' className='drawer-overlay'></label>
					<div className='menu p-4 overflow-y-auto bg-base-100 lg:bg-base-200 text-base-content w-64 flex flex-col'>
						{/* <!-- Sidebar content here --> */}
						<Logo />
						<div className='divider'></div>
						<ul className='custom-70vh flex flex-col gap-3'>
							<li>
								<NavLink to='/dashboard'>Dashboard</NavLink>
							</li>
							<li>
								<NavLink to='/students'>Students</NavLink>
							</li>
							<li>
								<NavLink to='/account'>Account Settings</NavLink>
							</li>
						</ul>
						<div className='flex flex-col items-center gap-3'>
							<div className='flex gap-3'>
								<div className='avatar'>
									<div className='w-16 rounded'>
										<img
											src='https://placeimg.com/192/192/people'
											alt='Tailwind-CSS-Avatar-component'
										/>
									</div>
								</div>
								<div className='flex flex-col justify-center'>
									<span className='text-lg'>{user.userName}</span>
									<span className='text-sm'>Teacher</span>
								</div>
							</div>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
