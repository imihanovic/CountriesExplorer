import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

const OpenStreetMap = ({ lat, lng, name }) => {
	return (
		<div className="mt-12 w-full h-80">
			<MapContainer
				center={[lat, lng]}
				zoom={6}
				className="w-full h-full rounded-lg shadow-lg"
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={[lat, lng]} icon={customIcon}>
					<Popup>{name}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default OpenStreetMap;
