import React from 'react';
import useStudents from '../contexts/useStudents';
import useLessons from '../contexts/useLessons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useMsg from '../contexts/useMsg';
import SmallAddButton from '../components/SmallAddButton';
import DeleteButton from '../components/DeleteButton';

function StudentProfile() {
	const { students, getStudents, setGetStudents } = useStudents();
	const { lessons } = useLessons();
	const navigate = useNavigate();
	const [student, setStudent] = React.useState({});
	const [editMode, setEditMode] = React.useState(false);
	const { id } = useParams();
	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();
	const [formData, setFormData] = React.useState({});

	React.useEffect(() => {
		setStudent(students.find(student => student._id === id));
	}, [id, students]);

	React.useEffect(() => {
		if (student) {
			setFormData({
				name: student.name,
				age: student.age,
				phone: student.phone,
				email: student.email,
				primaryContact: student.primaryContact,
				instrument: student.instrument,
				status: student.status,
			});
		}
	}, [student]);

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
					id: student._id,
					name: formData.name,
					age: formData.age,
					phone: formData.phone,
					email: formData.email,
					primaryContact: formData.primaryContact,
					instrument: formData.instrument,
					status: formData.status,
				},
				url: 'http://localhost:5000/students/updateStudent',
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
			setGetStudents(!getStudents);
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

	let lesson;
	if (lessons && student) {
		lesson = lessons.find(lesson => lesson.student === student._id);
	}

	return (
		<div>
			<div className='fixed top-2 left-16'>
				<div
					className='btn btn-ghost btn-square hover:bg-error border border-base-300'
					onClick={() => navigate('/students')}
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
							d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
						/>
					</svg>
				</div>
			</div>
			{student && (
				<form
					onSubmit={handleSubmit}
					className='bg-base-200 p-5 rounded mx-3 custom-80vh text-xl relative pb-20'
				>
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
										placeholder={student.name ? student.name : 'Name'}
										onChange={handleFormChange}
										className='input input-bordered w-full max-w-xs'
									/>
								) : (
									<h3 className='text-2xl'>{student.name}</h3>
								)}
								{editMode ? (
									<input
										type='text'
										name='instrument'
										placeholder={
											student.instrument ? student.instrument : 'Instrument'
										}
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
						<div className='text-lg flex flex-col p-2 rounded-xl gap-3'>
							<div>
								<div className='flex gap-3 items-center'>
									<h5 className='font-semibold'>Repertoire</h5>
									<SmallAddButton />
								</div>
								<ul className='list-disc list-inside'>
									{student.repertoire?.length > 0 ? (
										student.repertoire?.map((el, i) => {
											return <li key={i}>{el}</li>;
										})
									) : (
										<li>Add an item...</li>
									)}
								</ul>
							</div>
							<div>
								<div className='flex gap-3 items-center'>
									<h5 className='font-semibold'>Concepts</h5>
									<SmallAddButton />
								</div>
								<ul className='list-disc list-inside'>
									{student.concepts?.length > 0 ? (
										student.concepts?.map((el, i) => {
											return <li key={i}>{el}</li>;
										})
									) : (
										<li>Add an item...</li>
									)}
								</ul>
							</div>
							<div>
								<h5 className='font-semibold'>Contact Information</h5>
								<ul className='list-disc list-inside'>
									{editMode ? (
										<input
											type='tel'
											pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
											name='phone'
											placeholder={
												student.phone ? student.phone : '123-456-7890'
											}
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
											placeholder={student.email ? student.email : 'Email'}
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
											placeholder={
												student.primaryContact
													? student.phone
													: 'Primary Contact'
											}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
										/>
									) : (
										<li>Primary Contact: {student.primaryContact}</li>
									)}
								</ul>
							</div>
							<div>
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
						onClick={() => deleteLesson(student._id)}
					>
						<DeleteButton />
					</div>
				</form>
			)}
		</div>
	);
}

export default StudentProfile;
