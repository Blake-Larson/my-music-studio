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
			setMsg(
				{
					text: response.data.message.msgBody,
					success: true,
				},
				setClearMsg(!clearMsg)
			);
			setGetTodos(!getTodos);
			event.target.reset();
		} else {
			setMsg(
				{
					text: response.response.data.message.msgBody,
					success: false,
				},
				setClearMsg(!clearMsg)
			);
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
			<div
				className={
					msg.success ? 'text-success text-center' : 'text-error text-center'
				}
			>
				{msg ? msg.text : ''}
			</div>
		</div>
	);
}

export default CreateTodo;
