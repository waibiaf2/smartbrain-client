import React from 'react';

import './FaceRecognition.css';

const FaceRecognition = ({box,imageUrl}) => {
	return (
		<div className="center ma" style={{position:"relative", width:'500px'}}>
			<img
				src={imageUrl}
				alt="lady face"
				id="inputImage"
				width="500"
				height="auto"
			/>
			<div
				className='bounding-box'
			     style={{
					 top: box.topRow,
				     right: box.rightCol,
				     bottom: box.bottomRow,
				     left:box.leftCol,
			     }}>
			</div>
		</div>
	);
};

export default FaceRecognition;
