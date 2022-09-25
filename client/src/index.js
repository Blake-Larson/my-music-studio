import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './auth/useAuth';
import { MsgProvider } from './contexts/useMsg';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<MsgProvider>
					<App />
				</MsgProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>
);
