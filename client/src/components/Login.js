import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import useMsg from '../contexts/useMsg';

function Login() {
	let navigate = useNavigate();

	const { handleLogin } = useAuth();

	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();

	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setLoginData(prevloginData => ({
			...prevloginData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email: loginData.email,
					password: loginData.password,
				},
				url: 'http://localhost:5000/login',
				withCredentials: true,
			});
			console.log('From Server:', response.data.user);
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			handleLogin(response.data.user);
			navigate('/dashboard');
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

	return (
		<div>
			<label htmlFor='login-modal' className='btn modal-button'>
				Login
			</label>
			<input type='checkbox' id='login-modal' className='modal-toggle' />
			<label htmlFor='login-modal' className='modal cursor-pointer'>
				<label>
					<section className='flex flex-col items-center p-10'>
						<div className='card w-96 shadow-xl bg-neutral'>
							<div className='card-body'>
								<h1 className='card-title self-center mb-4 text-white'>
									Welcome back!
								</h1>
								<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
									<input
										type='text'
										name='email'
										placeholder='Email'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<input
										type='password'
										name='password'
										placeholder='Password'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<div className='card-actions justify-center mt-4'>
										<button className='btn btn-primary'>Log in</button>
									</div>
								</form>
								<div
									className={
										msg.success
											? 'text-success text-center'
											: 'text-error text-center'
									}
								>
									{msg ? msg.text : ''}
								</div>
							</div>
						</div>
					</section>
				</label>
			</label>
		</div>
	);
}

export default Login;
