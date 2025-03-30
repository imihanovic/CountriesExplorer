import React from "react";

const GoogleMaps = ({ lat, lng, name }) => {
	return (
		<div className="mt-12 w-full h-80">
			<iframe
				title={name}
				src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=6&output=embed`}
				width="100%"
				height="100%"
				className="rounded-lg shadow-lg border"
				allowFullScreen
				loading="lazy"
			/>
		</div>
	);
};

export default GoogleMaps;
