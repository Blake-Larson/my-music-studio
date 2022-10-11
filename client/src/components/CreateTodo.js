import { ErrorResponse } from '@remix-run/router';
import React from 'react';
import useAuth from '../auth/useAuth';
import useMsg from '../contexts/useMsg';
import TodoService from '../services/TodoService';
import SmallCheckButton from './buttons/SmallCheckButton';

function CreateTodo({ getTodos, setGetTodos }) {
	const { user } = useAuth();

	const { msg, setMsg, clearMsg, setClearMsg } = useMsg();

	const [formData, setFormData] = React.useState({
		text: '',
		user: user._id,
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
		const response = await TodoService.createTodo(formData);
		if (response.status === 200) {
			setGetTodos(!getTodos);
			event.target.reset();
		} else {
			console.log(response);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className='flex gap-2 items-center'>
				<input
					type='text'
					name='text'
					placeholder='Enter a todo'
					onChange={handleFormChange}
					className='input input-bordered w-full max-w-xs'
					required
				/>
				<button>
					<SmallCheckButton />
				</button>
			</form>
		</div>
	);
}

export default CreateTodo;
