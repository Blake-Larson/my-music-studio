import React from 'react';

function StudentProfile({ selectedStudent, setSelectedStudent }) {
	return (
		<div>
			{selectedStudent ? (
				<div className='bg-base-200 p-5 rounded mx-5 custom-80vh text-xl '>
					<div className='flex flex-col gap-5'>
						<div className='flex gap-3'>
							<div className='avatar'>
								<div className='w-24 rounded'>
									<img
										src='https://placeimg.com/192/192/people'
										alt='student profile'
									/>
								</div>
							</div>
							<div className='flex flex-col justify-evenly'>
								<h3 className='text-2xl'>{selectedStudent.name}</h3>
								<div className='flex justify-between'>
									<span>{selectedStudent.age}</span>
									<span>{selectedStudent.instrument}</span>
								</div>
							</div>
						</div>
						<div className='divider'></div>
						<div className='flex justify-evenly md:w-full text-center'>
							<div className='flex flex-col justify-evenly'>
								<span className='text-sm'>Next Lesson:</span>
								<span>{selectedStudent.instrument}</span>
							</div>
							<div className='flex flex-col justify-evenly'>
								<span className='text-sm'>Payment Status:</span>
								<span>{selectedStudent.instrument}</span>
							</div>
						</div>
						<div className='collapse collapse-arrow rounded-xl'>
							<input type='checkbox' />
							<div className='collapse-title text-lg font-medium'>
								Contact Information
							</div>
							<div className='collapse-content'>
								<div className='text-lg flex flex-col bg-base-100 p-2 rounded-xl'>
									<span>Primary Contact:</span>
									<span>Phone:</span>
									<span>Email:</span>
									<span>School:</span>
								</div>
							</div>
						</div>
						<div className='collapse collapse-arrow rounded-xl'>
							<input type='checkbox' />
							<div className='collapse-title text-lg font-medium'>
								Lesson Schedule
							</div>
							<div className='collapse-content'>
								<div className='text-lg flex flex-col bg-base-100 p-2 rounded-xl'>
									<span>Primary Contact:</span>
									<span>Phone:</span>
									<span>Email:</span>
									<span>School:</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				// <div className='bg-base-200 p-5 rounded mx-5 custom-80vh text-xl'>
				// 	<div className='flex gap-3'>
				// 		<div className='avatar'>
				// 			<div className='w-24 rounded'>
				// 				<img
				// 					src='https://placeimg.com/192/192/people'
				// 					alt='student profile'
				// 				/>
				// 			</div>
				// 		</div>
				// 		<div className='flex flex-col md:justify-around w-fit'>
				// 			<h3 className='text-2xl'>{selectedStudent.name}</h3>
				// 			<span>{selectedStudent.age}</span>
				// 		</div>
				// 		<div className='flex md:justify-evenly md:w-full text-center'>
				// 			<div className='flex flex-col justify-evenly'>
				// 				<span className='text-xs'>Instrument:</span>
				// 				<span>{selectedStudent.instrument}</span>
				// 			</div>
				// 			<div className='flex flex-col justify-evenly'>
				// 				<span className='text-xs'>Next Lesson:</span>
				// 				<span>{selectedStudent.instrument}</span>
				// 			</div>
				// 			<div className='flex flex-col justify-evenly'>
				// 				<span className='text-xs'>Status:</span>
				// 				<span>{selectedStudent.instrument}</span>
				// 			</div>
				// 		</div>
				// 	</div>
				// </div>
				<span>No Student Selected</span>
			)}
		</div>
	);
}

export default StudentProfile;
