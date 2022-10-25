/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			'primary-light': 'rgba(102, 204, 138, 0.3)',
			'secondary-light': 'rgba(56, 135, 199, 0.1)',
			'accent-light': 'rgba(209, 145, 51, 0.3)',
		},
		fontFamily: {
			lemon: ['Lemonada'],
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#66CC8A',

					secondary: '#3887C7',

					accent: '#D19133',

					neutral: '#333C4D',

					'base-100': '#FFFFFF',

					info: '#3ACFC2',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#BD5642',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
