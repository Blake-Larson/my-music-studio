import React from 'react';
import axios from 'axios';
import useMsg from '../contexts/useMsg';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const navigate = useNavigate();
	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();

	const [signUpData, setSignUpData] = React.useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		studioName: '',
	});

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setSignUpData(prevSignUpData => ({
			...prevSignUpData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(signUpData, 'Sign Up Attempt Sent');
		try {
			const response = await axios({
				method: 'POST',
				data: {
					userName: signUpData.userName,
					email: signUpData.email,
					password: signUpData.password,
					confirmPassword: signUpData.confirmPassword,
					studioName: signUpData.studioName,
					profileImg:
						'https://res.cloudinary.com/drwljgjhd/image/upload/v1665621280/blank_dz68ei.webp',
				},
				url: `${process.env.REACT_APP_API_URL}/signup`,
				withCredentials: true,
			});
			console.log('From Server:', response);
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			navigate(`/login`);
		} catch (err) {
			setMsg(
				{
					text: err.response.data.message.msgBody,
					success: false,
				},
				setClearMsg(!clearMsg)
			);
		}
	};

	return (
		<div>
			<Nav />
			<section className='flex flex-col items-center p-10 gap-5'>
				<h1 className='text-xl'>Sign Up</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-2 w-full items-center'
				>
					<input
						type='text'
						name='userName'
						placeholder='Full Name*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='text'
						name='studioName'
						placeholder='Studio Name'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
					/>
					<input
						type='text'
						name='email'
						placeholder='Email*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='password'
						name='password'
						placeholder='Password*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<input
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password*'
						onChange={handleFormChange}
						className='input border-2 border-base-300 w-full max-w-sm'
						required
					/>
					<div className='self-center mt-3'>
						<button className='btn btn-primary'>Create User</button>
					</div>
				</form>
				<div
					className={
						msg.success ? 'text-success text-center' : 'text-error text-center'
					}
				>
					{msg ? msg.text : ''}
				</div>
			</section>
		</div>
	);
}

export default SignUp;
