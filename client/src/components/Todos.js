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
		<div>
			<h2>Todos</h2>
			<ul className='list-disc list-inside'>
				{todos?.map((todo, i) => {
					return (
						<div key={i} className='flex group items-center gap-3'>
							<li className='text-lg'>{todo.text}</li>
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
			<CreateTodo getTodos={getTodos} setGetTodos={setGetTodos} />
		</div>
	);
}

export default Todos;
