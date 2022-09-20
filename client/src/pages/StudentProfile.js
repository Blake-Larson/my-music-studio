import React from 'react';

function StudentProfile({ currentStudent, setCurrentStudent }) {
	return (
		<div>
			{/* {currentStudent ? ( */}
			<div className='bg-base-200 p-5 rounded mx-5 custom-80vh'>
				<div className='flex gap-3'>
					<div className='avatar'>
						<div className='w-24 rounded'>
							<img
								src='https://placeimg.com/192/192/people'
								alt='student profile'
							/>
						</div>
					</div>
					<div className='flex flex-col justify-around w-fit'>
						<h3 className='text-2xl'>{currentStudent.name}</h3>
						<span>{currentStudent.age}</span>
					</div>
					<div className='flex justify-evenly w-full text-center'>
						<div className='flex flex-col justify-evenly'>
							<span className='text-xs'>Instrument:</span>
							<span className='just'>{currentStudent.instrument}</span>
						</div>
						<div className='flex flex-col justify-evenly'>
							<span className='text-xs'>Next Lesson:</span>
							<span className=''>{currentStudent.instrument}</span>
						</div>
						<div className='flex flex-col justify-evenly'>
							<span className='text-xs'>Status:</span>
							<span className=''>{currentStudent.instrument}</span>
						</div>
					</div>
				</div>
			</div>
			{/* ) : (  <span>No Student Selected</span>
			 )} */}
		</div>
	);
}

export default StudentProfile;
