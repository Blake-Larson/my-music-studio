import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo';
import { Image } from 'cloudinary-react';
import useAuth from '../auth/useAuth';
import SignOut from './buttons/SignOut';

function SideBar() {
	const { user } = useAuth();
	return (
		<div className='menu p-4 overflow-y-auto bg-base-100 lg:bg-base-200 text-base-content w-64 flex flex-col'>
			<Logo />
			<div className='divider'></div>
			<ul className='flex flex-col gap-3'>
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
			<div className='flex flex-col items-center gap-5 p-2 absolute bottom-0 left-0 right-0 mt-auto mb-5'>
				<div className='flex gap-3'>
					<div className='avatar'>
						<div className='w-16 rounded'>
							<Image
								cloudName='drwljgjhd'
								publicId={
									user.profileImg
										? user.profileImg
										: 'https://res.cloudinary.com/drwljgjhd/image/upload/v1664830344/w1plcgp0zhfp0jbnykyu.jpg'
								}
							/>
						</div>
					</div>
					<div className='flex flex-col justify-center'>
						<span className='text-lg'>{user.userName}</span>
						<span className='text-sm'>Teacher</span>
					</div>
				</div>
				<SignOut color={'nuetral'} textColor={'base-100'} />
			</div>
		</div>
	);
}

export default SideBar;
