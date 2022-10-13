import React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import useStringHook from '../hooks/useStringHook';
import useStudents from '../contexts/useStudents';
import useMsg from '../contexts/useMsg';

function CreateStudent() {
	const { user } = useAuth();
	const { getStudents, setGetStudents } = useStudents();
	const { capitolizeFirst } = useStringHook();

	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();

	const [formData, setFormData] = React.useState({
		name: '',
		age: '',
		phone: '',
		email: '',
		primaryContact: '',
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
					phone: formData.phone,
					email: formData.email.toLowerCase(),
					primaryContact: formData.primaryContact,
					instrument: formData.instrument
						? capitolizeFirst(formData.instrument)
						: '',
					repertoire: [],
					concepts: [],
					profileImg:
						'https://res.cloudinary.com/drwljgjhd/image/upload/v1665621280/blank_dz68ei.webp',
					teacher: user._id,
				},
				url: `${process.env.REACT_APP_API_URL}/students/createStudent`,
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
			setGetStudents(!getStudents);
			event.target.reset();
		} catch (err) {
			console.log(err);
			setMsg(
				{
					text: err.response.data.message.msgBody,
					success: false,
				},
				setClearMsg(!clearMsg)
			);
			console.log(err.response);
		}
	};

	return (
		<div>
			<label
				htmlFor='createStudent-modal'
				className='btn btn-square btn-primary'
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
							<div className='card-body flex flex-col gap-3 max-h-96 overflow-auto md:max-h-full'>
								<label
									htmlFor='createStudent-modal'
									className='btn btn-sm btn-circle absolute right-2 top-2 bg-base-100 text-neutral'
								>
									✕
								</label>
								<h1 className='card-title self-center text-base-100'>
									New Student
								</h1>
								<span className='text-center text-base-100'>
									Information can be updated later from the student profile
									page.
								</span>
								<form
									onSubmit={handleSubmit}
									className='flex flex-col gap-2 form-control'
								>
									<input
										type='text'
										name='name'
										placeholder='Name'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
										required
									/>
									<input
										type='text'
										name='age'
										placeholder='Age'
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
									<input
										type='tel'
										pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
										name='phone'
										placeholder='123-456-7890'
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
										name='primaryContact'
										placeholder='Primary Contact'
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

export default CreateStudent;
