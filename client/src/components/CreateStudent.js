import React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import useStringHook from '../hooks/useStringHook';

function CreateStudent() {
	const { user } = useAuth();
	const { capitolizeFirst } = useStringHook();

	const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});

	const [formData, setFormData] = React.useState({
		name: '',
		age: '',
		email: '',
		instrument: '',
	});

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setFormData(prevformData => ({
			...prevformData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(formData, 'New Student Attempt Sent');
		try {
			const response = await axios({
				method: 'POST',
				data: {
					name: capitolizeFirst(formData.name),
					age: formData.age,
					email: formData.email.toLowerCase(),
					instrument: capitolizeFirst(formData.instrument),
					teacher: user._id,
				},
				url: 'http://localhost:5000/students/createStudent',
				withCredentials: true,
			});
			console.log('From Server:', response);
			setMsg({
				text: response.data.message.msgBody,
				success: true,
			});
			event.target.reset();
		} catch (err) {
			setMsg({
				text: err.response.data.message.msgBody,
				success: false,
			});
			console.log(err.response);
		}
	};

	return (
		<div>
			<label htmlFor='createStudent-modal' className='btn btn-square'>
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
						d='M12 4.5v15m7.5-7.5h-15'
					/>
				</svg>
			</label>
			<input
				type='checkbox'
				id='createStudent-modal'
				className='modal-toggle'
			/>
			<label htmlFor='createStudent-modal' className='modal cursor-pointer'>
				<label>
					<section className='flex flex-col items-center p-10'>
						<div className='card w-96 shadow-xl bg-neutral'>
							<div className='card-body'>
								<label
									htmlFor='createStudent-modal'
									className='btn btn-sm btn-circle absolute right-2 top-2'
								>
									✕
								</label>
								<h1 className='card-title self-center mb-4 text-white'>
									New Student
								</h1>
								<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
									<input
										type='text'
										name='name'
										placeholder='Name'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<input
										type='text'
										name='age'
										placeholder='Age'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<input
										type='text'
										name='email'
										placeholder='Email'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<input
										type='text'
										name='instrument'
										placeholder='Instrument'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<div className='card-actions justify-center mt-4'>
										<button className='btn btn-primary'>
											Create New Student
										</button>
									</div>
								</form>
								<div
									className={
										msg.success
											? 'text-success text-center'
											: 'text-warning text-center'
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

export default CreateStudent;
