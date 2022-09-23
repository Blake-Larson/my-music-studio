import React from 'react';
import useStudents from '../contexts/useStudents';
import useLessons from '../contexts/useLessons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function StudentProfile() {
	const { students, getStudents, setGetStudents } = useStudents();
	const { lessons } = useLessons();
	const navigate = useNavigate();
	const [student, setStudent] = React.useState({});
	const [editMode, setEditMode] = React.useState(false);
	const { id } = useParams();

	React.useEffect(() => {
		setStudent(students.find(student => student._id === id));
	}, [id, students]);

	async function deleteLesson(studentID) {
		if (window.confirm('Are you sure you want to delete this student?')) {
			try {
				const response = await axios({
					method: 'DELETE',
					data: { id: studentID },
					url: 'http://localhost:5000/students/delete',
					withCredentials: true,
				});
				console.log('From Server:', response);
				setGetStudents(!getStudents);
				navigate('/students');
			} catch (err) {
				console.log(err.response);
			}
		}
	}

	const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});

	const [formData, setFormData] = React.useState({
		toggle: false,
		name: '',
		age: '',
		phone: '',
		email: '',
		primaryContact: '',
		instrument: '',
		active: '',
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
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email: formData.email,
					password: formData.password,
				},
				url: 'http://localhost:5000/login',
				withCredentials: true,
			});
			console.log('From Server:', response.data.user);
			setMsg({
				text: response.data.message.msgBody,
				success: true,
			});
		} catch (err) {
			console.log(err);
			setMsg({
				text: err.response.data.message.msgBody,
				success: false,
			});
		}
	};

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
			<button className='btn btn-primary'>Save</button>
		</div>
	</form>;
	<div
		className={
			msg.success ? 'text-success text-center' : 'text-error text-center'
		}
	>
		{msg ? msg.text : ''}
	</div>;

	let lesson;
	if (lessons && student) {
		lesson = lessons.find(lesson => lesson.student === student._id);
	}

	return (
		<div>
			<label
				className='label cursor-pointer flex flex-col'
				onClick={() => setEditMode(!editMode)}
			>
				<span className='label-text'>
					{formData.toggle ? 'Editing...' : 'Edit Mode'}
				</span>
				<input
					type='checkbox'
					name='toggle'
					className='toggle checked:toggle-primary'
					value={formData.toggle}
					onChange={handleFormChange}
				/>
			</label>
			{student && (
				<div className='bg-base-200 p-5 rounded mx-3 custom-80vh text-xl relative'>
					<div className='flex flex-col gap-5'>
						<div className='flex gap-3'>
							<div className='avatar'>
								<div className='w-24 rounded'>
									<img
										src='https://placeimg.com/192/192/people'
										alt='student profile'
									/>
								</div>
							</div>
							<div className='flex flex-col justify-evenly w-full'>
								{editMode ? (
									<input
										type='text'
										name='name'
										placeholder={student.name}
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
										required
									/>
								) : (
									<h3 className='text-2xl'>{student.name}</h3>
								)}
								{editMode ? (
									<input
										type='text'
										name='instrument'
										placeholder={student.instrument}
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
								) : (
									<span>{student.instrument}</span>
								)}
							</div>
						</div>
						<div className='divider'></div>
						{lesson && (
							<div className='flex justify-evenly md:w-full text-center'>
								<div className='flex flex-col justify-evenly'>
									<h5 className='font-semibold'>Next Lesson</h5>
									<span>{`${lesson.date.weekday}, ${lesson.date.date}`}</span>
									<span className='text-lg'>{`${lesson.date.start} - ${lesson.date.end}`}</span>
								</div>
							</div>
						)}
						<div className='text-lg flex flex-col p-2 rounded-xl'>
							<div>
								<h5 className='font-semibold'>Repertoire</h5>
								<ul className='list-disc list-inside'>
									<li>{student.name}</li>
								</ul>
								<h5 className='font-semibold'>Concepts</h5>
								<ul className='list-disc list-inside'>
									<li>{student.name}</li>
								</ul>
								<h5 className='font-semibold'>Contact Information</h5>
								<ul className='list-disc list-inside'>
									{editMode ? (
										<input
											type='tel'
											pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
											name='phone'
											placeholder={student.phone}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
										/>
									) : (
										<li>Phone: {student.phone}</li>
									)}
									{editMode ? (
										<input
											type='text'
											name='email'
											placeholder={student.email}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
										/>
									) : (
										<li>Email: {student.email}</li>
									)}
									{editMode ? (
										<input
											type='text'
											name='primaryContact'
											placeholder={student.primaryContact}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
										/>
									) : (
										<li>Primary Contact: {student.primaryContact}</li>
									)}
								</ul>
								<h5 className='font-semibold'>Status</h5>
								<ul className='list-disc list-inside'>
									{editMode ? (
										<select
											className='select select-bordered w-full max-w-xs'
											id='student'
											value={formData.student}
											onChange={handleFormChange}
											name='student'
										>
											<option value='Active'>Active</option>
											<option value='Inactive'>Inactive</option>
											<option value='Archived'>Archived</option>
										</select>
									) : (
										<li>{student.status}</li>
									)}
								</ul>
							</div>
						</div>
					</div>
					<div className='absolute right-4 bottom-4'>
						<button
							className='btn btn-ghost btn-square hover:bg-error border border-base-300'
							onClick={() => deleteLesson(student._id)}
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
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default StudentProfile;
