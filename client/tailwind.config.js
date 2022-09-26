/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			lemon: ['Lemonada'],
		},
	},
	plugins: [require('daisyui')],
};
