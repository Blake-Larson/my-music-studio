import React from 'react';
import axios from 'axios';
import AddButton from './buttons/AddButton';
import useStudents from '../contexts/useStudents';
import useStringHook from '../hooks/useStringHook';
import SmallDeleteButton from './buttons/SmallDeleteButton';
import SmallCheckButton from './buttons/SmallCheckButton';
import SmallCancelButton from './buttons/SmallCancelButton';

function List({ student, arrayName }) {
	const { getStudents, setGetStudents } = useStudents();
	const [formData, setFormData] = React.useState({});
	const [show, setShow] = React.useState(false);
	const { capitolizeFirst } = useStringHook();
	const [resetForm, setResetForm] = React.useState(false);

	React.useEffect(() => {
		setFormData({
			[arrayName]: '',
		});
	}, [arrayName]);

	async function handleDelete(i) {
		student[arrayName].splice(i, 1);
		let newArr = student[arrayName];
		try {
			const response = await axios({
				method: 'PUT',
				data: {
					id: student._id,
					list: [arrayName],
					newArr: newArr,
				},
				url: `${process.env.REACT_APP_API_URL}/students/updateListItem`,
				withCredentials: true,
			});
			console.log(response);
			setGetStudents(!getStudents);
		} catch (err) {
			console.log(err);
		}
	}

	function handleFormChange(event) {
		const { name, value } = event.target;
		setFormData({ [name]: value });
	}

	const handleSubmit = async event => {
		event.preventDefault();
		let newArr;
		if (student[arrayName]) {
			student[arrayName].push(formData[arrayName]);
			newArr = student[arrayName];
		} else {
			newArr = [formData[arrayName]];
		}
		try {
			const response = await axios({
				method: 'PUT',
				data: {
					id: student._id,
					list: [arrayName],
					newArr: newArr,
				},
				url: `${process.env.REACT_APP_API_URL}/students/updateListItem`,
				withCredentials: true,
			});
			console.log(response);
			event.target.reset();
			setResetForm(!resetForm);
			setGetStudents(!getStudents);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<div className='flex gap-3 items-center'>
				<h3 className='font-semibold text-lg'>{capitolizeFirst(arrayName)}</h3>
				<div onClick={() => setShow(!show)}>
					<AddButton width={'4'} height={'4'} padding={'0.5'} />
				</div>
			</div>
			<ul className='list-disc list-inside'>
				{student[arrayName] &&
					student[arrayName]?.map((el, i) => {
						return (
							<div key={i} className='flex group items-center gap-3'>
								<li>{el}</li>
								<div
									className='group-hover:opacity-100 opacity-0 transition-opacity duration-500 inline-block'
									onClick={() => handleDelete(i)}
								>
									<SmallDeleteButton />
								</div>
							</div>
						);
					})}
				<li className={show ? 'flex items-center gap-3' : 'hidden'}>
					<input
						type='text'
						name={arrayName}
						placeholder={'Add an item...'}
						onChange={handleFormChange}
						className='input input-bordered w-full max-w-xs'
					/>
					<button onClick={() => setShow(!show)}>
						<SmallCheckButton />
					</button>
					<div
						onClick={() => {
							setShow(!show);
							setResetForm(!resetForm);
						}}
					>
						<SmallCancelButton />
					</div>
				</li>
			</ul>
		</form>
	);
}

export default List;
