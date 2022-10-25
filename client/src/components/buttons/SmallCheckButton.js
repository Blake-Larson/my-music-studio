import React from 'react';

function SmallCheckButton() {
	return (
		<div className='btn-ghost border border-base-300 p-0.5 rounded-md cursor-pointer hover:btn-primary bg-base-100'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-4 h-4'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M4.5 12.75l6 6 9-13.5'
				/>
			</svg>
		</div>
	);
}

export default SmallCheckButton;
