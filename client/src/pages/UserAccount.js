import React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import useMsg from '../contexts/useMsg';
import DeleteButton from '../components/DeleteButton';

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

						<div
							className='absolute right-4 bottom-4'
							onClick={() => deleteUser(user._id)}
						>
							<DeleteButton />
						</div>
					</div>
				</form>
			)}
		</div>
	);
}

export default UserAccount;
