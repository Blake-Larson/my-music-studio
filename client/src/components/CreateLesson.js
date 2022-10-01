import React from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import dayjs from 'dayjs';
import useStudents from '../contexts/useStudents';
import useLessons from '../contexts/useLessons';
import useMsg from '../contexts/useMsg';

function CreateLesson() {
	const { user } = useAuth();
	const { students } = useStudents();
	const { getLessons, setGetLessons } = useLessons();

	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();

	const [formData, setFormData] = React.useState({
		student: '',
		date: '',
		end: '',
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
		const date = {
			dateObj: dayjs(formData.date),
			date: dayjs(formData.date).format('MM/DD/YY'),
			weekday: dayjs(formData.date).format('dddd'),
			start: dayjs(formData.date).format('h:mm A'),
			end: dayjs(formData.end).format('h:mm A'),
		};
		console.log(formData, 'New Lesson Attempt Sent');
		try {
			const response = await axios({
				method: 'POST',
				data: {
					teacher: user._id,
					student: formData.student,
					date: date,
				},
				url: 'http://localhost:5000/lessons/createLesson',
				withCredentials: true,
			});
			setGetLessons(!getLessons);
			console.log('From Server:', response);
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			event.target.reset();
		} catch (err) {
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

	const selectStudent = students.map((el, i) => {
		return (
			<option key={i} value={el._id}>
				{el.name}
			</option>
		);
	});

	return (
		<div>
			<label
				htmlFor='createLesson-modal'
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
			<input type='checkbox' id='createLesson-modal' className='modal-toggle' />
			<label htmlFor='createLesson-modal' className='modal cursor-pointer'>
				<label>
					<section className='flex flex-col items-center p-10'>
						<div className='card w-96 shadow-xl bg-base-100'>
							<div className='card-body'>
								<label
									htmlFor='createLesson-modal'
									className='btn btn-sm btn-circle absolute right-2 top-2'
								>
									✕
								</label>
								<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
									<label className='label flex flex-col gap-2'>
										<span>Student:</span>
										<select
											className='select select-bordered w-full max-w-xs'
											id='student'
											value={formData.student}
											onChange={handleFormChange}
											name='student'
											required
										>
											<option value=''>Select a Student</option>
											{selectStudent}
										</select>
									</label>
									<label className='label flex flex-col gap-2'>
										<span>Start:</span>
										<input
											type='datetime-local'
											id='date'
											name='date'
											value={formData.date}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
									<label className='label flex flex-col gap-2'>
										<span>End:</span>
										<input
											type='datetime-local'
											id='end'
											name='end'
											value={formData.end}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
									<div className='card-actions justify-center mt-4'>
										<button className='btn btn-primary'>
											Create New Lesson
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

export default CreateLesson;
