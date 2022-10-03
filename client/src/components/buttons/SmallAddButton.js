import React from 'react';

function SmallAddButton() {
	return (
		<div className='btn-ghost border border-base-300 p-0.5 rounded-md cursor-pointer hover:btn-primary'>
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
					d='M12 4.5v15m7.5-7.5h-15'
				/>
			</svg>
		</div>
	);
}

export default SmallAddButton;
