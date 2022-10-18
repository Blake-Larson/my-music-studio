import React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import useMsg from '../contexts/useMsg';
import DeleteButton from '../components/buttons/DeleteButton';
import { Image } from 'cloudinary-react';

function UserAccount() {
	const navigate = useNavigate();
	const { user, getUser, setGetUser, setAuthed } = useAuth();
	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();
	const [editMode, setEditMode] = React.useState(false);

	const [formData, setFormData] = React.useState({});

	React.useEffect(() => {
		if (user) {
			setFormData({
				userName: user.userName,
				email: user.email,
				studioName: user.studioName,
				profileImg: user.profileImg,
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
			const profileImg = await uploadImage();
			const response = await axios({
				method: 'PUT',
				data: {
					id: user._id,
					userName: formData.userName,
					email: formData.email,
					studioName: formData.studioName,
					profileImg: profileImg ? profileImg : user.profileImg,
					oldImg: user.profileImg,
				},
				url: `${process.env.REACT_APP_API_URL}/updateUser`,
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
			setGetUser(!getUser);
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

	const [image, setImage] = React.useState(null);

	const uploadImage = async () => {
		const imageFormData = new FormData();
		imageFormData.append('file', image);
		imageFormData.append('upload_preset', 'tifn41tp');

		try {
			const response = await axios({
				method: 'POST',
				data: imageFormData,
				url: 'https://api.cloudinary.com/v1_1/drwljgjhd/image/upload',
			});
			console.log(response);
			return response.data.public_id;
		} catch (err) {
			console.log(err);
		}
	};

	async function deleteUser() {
		if (window.confirm('Are you sure you want to delete your account?')) {
			try {
				const response = await axios({
					method: 'DELETE',
					data: { id: user._id },
					url: `${process.env.REACT_APP_API_URL}/delete`,
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
			<div className='p-3 sticky z-50 bg-base-100 w-full border border-base-100 border-b-base-200 top-0'>
				<h1 className='text-2xl text-center lg:text-start font-lemon'>
					Account Settings
				</h1>
			</div>
			{user && (
				<form
					onSubmit={handleSubmit}
					className='bg-base-200 p-5 rounded m-5 relative pb-20'
				>
					<div className='flex flex-col gap-5'>
						<div className='flex gap-3'>
							<div className='avatar'>
								<div className='w-24 rounded border border-base-100'>
									<Image cloudName='drwljgjhd' publicId={user.profileImg} />
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
										type='text'
										name='studioName'
										placeholder={
											user.studioName ? user.studioName : 'Studio Name'
										}
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
								) : user.studioName ? (
									<h3 className='text-2xl'>{user.studioName}</h3>
								) : (
									<h3 className='opacity-60'>Studio name</h3>
								)}
							</div>
						</div>
						{editMode && (
							<div>
								<h2 className='font-bold text-lg'>Profile Photo</h2>
								<input
									type='file'
									onChange={event => setImage(event.target.files[0])}
								/>
							</div>
						)}
						<div>
							<h2 className='font-bold text-lg'>Email</h2>
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
									className='btn btn-ghost hover:bg-warning border-base-300'
									onClick={() => setEditMode(!editMode)}
								>
									edit
								</div>
							)}
							{editMode && (
								<button className='btn btn-ghost hover:bg-primary border-base-300'>
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
