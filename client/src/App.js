import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/dashboard'
				element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				}
			/>
			<Route
				path='/students/*'
				element={
					<RequireAuth>
						<Students />
					</RequireAuth>
				}
			/>
			<Route path='*' element={<NoMatch />} />
		</Routes>
	);
};

export default App;
