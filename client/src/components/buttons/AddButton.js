import React from 'react';

function AddButton({ width, height, padding }) {
	return (
		<div
			className={`btn-ghost border border-base-300 p-${padding} rounded-md cursor-pointer hover:btn-primary`}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className={`w-${width} h-${height}`}
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

export default AddButton;
