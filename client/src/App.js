import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import { StudentProvider } from './contexts/useStudents';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/dashboard'
				element={
					<RequireAuth>
						<StudentProvider>
							<Dashboard />
						</StudentProvider>
					</RequireAuth>
				}
			/>
			<Route
				path='/students/*'
				element={
					<RequireAuth>
						<StudentProvider>
							<Students />
						</StudentProvider>
					</RequireAuth>
				}
			/>
			<Route path='*' element={<NoMatch />} />
		</Routes>
	);
};

export default App;
