import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import Nav from '../components/Nav';
import { StudentProvider } from '../contexts/useStudents';
import { LessonProvider } from '../contexts/useLessons';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import Hamburger from '../components/buttons/Hamburger';

export const RequireAuth = ({ children }) => {
	const { authed } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [bgColor, setBgColor] = React.useState('');

	React.useEffect(() => {
		if (children.type.name === 'Dashboard') {
			setBgColor('bg-secondary-light');
		} else if (children.type.name === 'Students') {
			setBgColor('bg-secondary-light');
		} else if (children.type.name === 'UserAccount') {
			setBgColor('bg-secondary-light');
		}
	}, [children.type.name]);

	React.useEffect(() => {
		const clear = setTimeout(() => {
			!authed && navigate('/login');
		}, 1500);

		return () => clearTimeout(clear);
	}, [authed, navigate]);

	return (
		<div>
			{location.pathname === '/' && <Nav />}
			<div className='drawer drawer-mobile'>
				<input id='drawer' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col min-h-full'>
					{/* <!-- Page content here --> */}
					{authed ? (
						<StudentProvider>
							<LessonProvider>
								<div className={`custom-90vh overflow-auto ${bgColor}`}>
									{children}
								</div>
							</LessonProvider>
						</StudentProvider>
					) : (
						<div className='flex justify-center mt-10'>
							<button className='btn loading text-base-100'>loading</button>
						</div>
					)}
					<Footer />
					<Hamburger />
				</div>
				<div className='drawer-side'>
					<label htmlFor='drawer' className='drawer-overlay'></label>
					<SideBar />
				</div>
			</div>
		</div>
	);
};
