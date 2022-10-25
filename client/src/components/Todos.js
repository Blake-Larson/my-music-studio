import React from 'react';
import CreateTodo from './CreateTodo';
import useAuth from '../auth/useAuth';
import TodoService from '../services/TodoService';
import SmallDeleteButton from './buttons/SmallDeleteButton';

function Todos() {
	const { user } = useAuth();
	const [todos, setTodos] = React.useState([]);
	const [getTodos, setGetTodos] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await TodoService.getTodos(user._id);
				setTodos(response.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [user._id, getTodos]);

	async function deleteTodo(todoId) {
		try {
			await TodoService.deleteTodo(todoId);
			setGetTodos(!getTodos);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className='flex flex-col gap-5 w-full max-w-lg items-center'>
			<h2 className='text-xl font-semibold text-center'>Todo List</h2>
			<div className='flex flex-col gap-5 w-full rounded-xl shadow-lg bg-primary-light p-5'>
				<ul className='list-disc list-inside'>
					{todos?.map((todo, i) => {
						return (
							<div key={i} className='flex group items-center gap-3'>
								<li>{todo.text}</li>
								<div
									className='group-hover:opacity-100 opacity-0 transition-opacity duration-500 inline-block'
									onClick={() => deleteTodo(todo._id)}
								>
									<SmallDeleteButton />
								</div>
							</div>
						);
					})}
				</ul>
				<div className='flex justify-center'>
					<CreateTodo getTodos={getTodos} setGetTodos={setGetTodos} />
				</div>
			</div>
		</div>
	);
}

export default Todos;
