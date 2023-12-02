import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
const MapComponentLighter = ({ from, to }) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
            const bounds = L.latLngBounds([from, to]);
            map.fitBounds(bounds);
        }
    }, [map, from, to]);

    return (
        <MapContainer
            center={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2]}
            zoom={4}
            whenCreated={setMap}
            style={{ width: '100%', height: '260px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={from} />
            <Marker position={to} />
            <Polyline positions={[from, to]} />
        </MapContainer>
    );
};
export default MapComponentLighter;

