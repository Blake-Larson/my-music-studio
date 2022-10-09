import React from 'react';
import useStudents from '../contexts/useStudents';
import useLessons from '../contexts/useLessons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useMsg from '../contexts/useMsg';
import DeleteButton from '../components/buttons/DeleteButton';
import List from '../components/List';
import { Image } from 'cloudinary-react';
import PastLessons from '../components/PastLessons';
import dayjs from 'dayjs';

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
				repertoire: student.repertoire,
				concepts: student.concepts,
				phone: student.phone,
				email: student.email,
				primaryContact: student.primaryContact,
				instrument: student.instrument,
				status: student.status,
			});
		}
	}, [student]);

	async function deleteStudent(studentID) {
		if (window.confirm('Are you sure you want to delete this student?')) {
			try {
				const response = await axios({
					method: 'DELETE',
					data: { id: studentID },
					url: `${process.env.REACT_APP_API_URL}/students/delete`,
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
		const profileImg = await uploadImage();
		try {
			const response = await axios({
				method: 'PUT',
				data: {
					id: student._id,
					name: formData.name,
					age: formData.age,
					repertoire: student.repertoire,
					concepts: student.concepts,
					phone: formData.phone,
					email: formData.email,
					primaryContact: formData.primaryContact,
					instrument: formData.instrument,
					status: formData.status,
					profileImg: profileImg ? profileImg : student.profileImg,
					oldImg: student.profileImg,
				},
				url: `${process.env.REACT_APP_API_URL}/students/updateStudent`,
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

	let nextLesson;
	if (lessons && student) {
		nextLesson = lessons
			.filter(el =>
				dayjs(el.date.dateObj).isAfter(dayjs(new Date()).format('YYYY-MM-DD'))
			)
			.find(lesson => lesson.student === student._id);
	}
	let allLessons;
	if (lessons && student) {
		allLessons = lessons
			.filter(el => el.student === student._id)
			.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
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
				<div className='bg-base-200 p-5 rounded mx-3 text-xl relative pb-20 flex flex-col gap-5'>
					<form onSubmit={handleSubmit}>
						<div className='flex flex-col'>
							<div className='flex gap-3'>
								<div className='avatar'>
									<div className='w-24 rounded'>
										<Image
											cloudName='drwljgjhd'
											publicId={
												student.profileImg
													? student.profileImg
													: 'https://res.cloudinary.com/drwljgjhd/image/upload/v1664830344/w1plcgp0zhfp0jbnykyu.jpg'
											}
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
							{editMode && (
								<div>
									<h2 className='font-bold text-lg'>Profile Photo</h2>
									<input
										type='file'
										onChange={event => setImage(event.target.files[0])}
									/>
								</div>
							)}

							<div
								className={
									msg.success
										? 'absolute top-10 left-0 right-0 m-auto text-success text-center'
										: 'absolute top-10 left-0 right-0 m-auto text-error text-center'
								}
							>
								{msg ? msg.text : ''}
							</div>

							<div className='divider'></div>
							<div className='text-lg flex flex-col rounded-xl gap-5'>
								{nextLesson && (
									<div className='flex flex-col justify-evenly'>
										<h3 className='text-lg font-semibold'>Next Lesson</h3>
										<span>{`${nextLesson.date.weekday}, ${nextLesson.date.date}`}</span>
										<span className='text-lg'>{`${nextLesson.date.start} - ${nextLesson.date.end}`}</span>
									</div>
								)}
								<div>
									<h3 className='font-semibold'>Contact Information</h3>
									<ul className='list-disc list-inside max-w-xl'>
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
														? student.primaryContact
														: 'Primary Contact'
												}
												onChange={handleFormChange}
												className='input input-bordered w-full max-w-xs'
											/>
										) : (
											<li
												className={student.primaryContact ? '' : 'opacity-50'}
											>
												Primary Contact: {student.primaryContact}
											</li>
										)}
									</ul>
								</div>
								<div>
									<h3 className='font-semibold'>Status</h3>
									<ul className='list-disc list-inside'>
										{editMode ? (
											<select
												className='select select-bordered w-full max-w-xs'
												id='status'
												value={formData.student}
												onChange={handleFormChange}
												name='status'
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
							onClick={() => deleteStudent(student._id)}
						>
							<DeleteButton />
						</div>
					</form>
					<List arrayName={'repertoire'} student={student} />
					<List arrayName={'concepts'} student={student} />
					<PastLessons allLessons={allLessons} />
				</div>
			)}
		</div>
	);
}

export default StudentProfile;
