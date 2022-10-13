/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			lemon: ['Lemonada'],
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#66CC8A',

					secondary: '#93c5fd',

					accent: '#fdba74',

					neutral: '#333C4D',

					'base-100': '#FFFFFF',

					info: '#bfdbfe',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#F87272',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
