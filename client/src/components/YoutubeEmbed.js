import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({ embedId }) => (
	<div className='flex justify-center'>
		<iframe
			src={`https://www.youtube.com/embed/${embedId}`}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			title='Embedded youtube'
			className='w-full aspect-video max-w-2xl rounded-lg'
		/>
	</div>
);

YoutubeEmbed.propTypes = {
	embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
