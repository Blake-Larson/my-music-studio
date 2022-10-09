import React from 'react';
import organize from '../assets/images/organize.jpg';
import teach from '../assets/images/teach.jpg';
import manage from '../assets/images/manage.jpg';

function Card() {
	return (
		<div className='flex justify-evenly'>
			<div className='card w-96 bg-base-100 shadow-xl'>
				<figure>
					<img src={organize} alt='keyboard, paper, and writing utensils' />
				</figure>
				<div className='card-body'>
					<h2 className='card-title'>Organize</h2>
					<p>
						Quickly view student information, current repertoire, and manage
						your tasks.
					</p>
				</div>
			</div>
			<div className='card w-96 bg-base-100 shadow-xl'>
				<figure>
					<img src={teach} alt='Young person being taught guitar' />
				</figure>
				<div className='card-body'>
					<h2 className='card-title'>Teach</h2>
					<p>Save time so you can spend more time teaching your students!</p>
				</div>
			</div>
			<div className='card w-96 bg-base-100 shadow-xl'>
				<figure>
					<img src={manage} alt='Woman and child learning piano' />
				</figure>
				<div className='card-body'>
					<h2 className='card-title'>Manage</h2>
					<p>
						Keep track of your lesson times so you know what to expect for the
						day.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
