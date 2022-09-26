import React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import useMsg from '../contexts/useMsg';

function UserAccount() {
	const navigate = useNavigate();
	const { user, setUser, setAuthed } = useAuth();
	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();
	const [editMode, setEditMode] = React.useState(false);

	const [formData, setFormData] = React.useState({});

	React.useEffect(() => {
		if (user) {
			setFormData({
				userName: user.userName,
				email: user.email,
			});
		}
	}, [user]);

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setFormData(prevformData => ({
			...prevformData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const response = await axios({
				method: 'PUT',
				data: {
					id: user._id,
					userName: formData.userName,
					email: formData.email,
				},
				url: 'http://localhost:5000/updateUser',
				withCredentials: true,
			});
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			setEditMode(!editMode);
			setUser({
				userName: formData.userName,
				email: formData.email,
			});
		} catch (err) {
			console.log(err);
			setMsg(
				{
					text: err.response.data.message.msgBody,
					success: false,
				},
				setClearMsg(!clearMsg)
			);
		}
	};

	async function deleteUser() {
		if (window.confirm('Are you sure you want to delete your account?')) {
			try {
				const response = await axios({
					method: 'DELETE',
					data: { id: user._id },
					url: 'http://localhost:5000/delete',
					withCredentials: true,
				});
				console.log('From Server:', response);
				navigate('/');
				setAuthed(false);
			} catch (err) {
				console.log(err.response);
			}
		}
	}

	return (
		<div>
			<div className='p-3 mb-3'>
				<h1 className='text-3xl text-center lg:text-start'>Account Settings</h1>
			</div>
			{user && (
				<form
					onSubmit={handleSubmit}
					className='bg-base-200 p-5 rounded mx-3 text-xl relative pb-20'
				>
					<div className='flex flex-col gap-5'>
						<div className='flex gap-3'>
							<div className='avatar'>
								<div className='w-24 rounded'>
									<img
										src='https://placeimg.com/192/192/people'
										alt='user profile'
									/>
								</div>
							</div>
							<div className='flex flex-col justify-evenly w-full'>
								{editMode ? (
									<input
										type='text'
										name='userName'
										placeholder={user.userName ? user.userName : 'Name'}
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
								) : (
									<h3 className='text-2xl'>{user.userName}</h3>
								)}
								{editMode ? (
									<input
										type='email'
										name='email'
										placeholder={user.email ? user.email : 'Email'}
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
								) : (
									<span>{user.email}</span>
								)}
							</div>
						</div>

						<div
							className={
								msg.success
									? 'text-success text-center'
									: 'text-error text-center'
							}
						>
							{msg ? msg.text : ''}
						</div>
						<div className='absolute left-4 bottom-4 flex gap-3'>
							{!editMode && (
								<div
									className='btn btn-ghost hover:bg-error border-base-300'
									onClick={() => setEditMode(!editMode)}
								>
									edit
								</div>
							)}
							{editMode && (
								<button className='btn btn-ghost hover:bg-error border-base-300'>
									Save
								</button>
							)}
							{editMode && (
								<div
									className='btn btn-ghost hover:bg-error border-base-300'
									onClick={() => setEditMode(!editMode)}
								>
									cancel
								</div>
							)}
						</div>

						<div className='absolute right-4 bottom-4'>
							<div
								className='btn btn-ghost btn-square hover:bg-error border border-base-300'
								onClick={() => deleteUser(user._id)}
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
										d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
									/>
								</svg>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}

export default UserAccount;
