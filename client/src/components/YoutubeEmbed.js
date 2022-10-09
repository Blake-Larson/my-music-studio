import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({ embedId }) => (
	<div className='flex flex-col items-center w-1/3 mx-auto'>
		<div className='relative overflow-hidden max-w-full w-full'>
			<iframe
				src={`https://www.youtube.com/embed/${embedId}`}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				title='Embedded youtube'
				className='absolute top-0 left-0 w-full h-full'
			/>
		</div>
	</div>
);

YoutubeEmbed.propTypes = {
	embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
