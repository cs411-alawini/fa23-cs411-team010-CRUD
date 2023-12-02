import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {iata} from "../utils/helpers.js";

mapboxgl.accessToken = 'pk.eyJ1IjoieXpob25nMzIiLCJhIjoiY2xwbjhndjUzMGU3dDJqbmo4c3Y1eWFrYyJ9.Kt_TPPXwGu-sWZOePYqoow';

const iataData = iata()
const MapComponent = ({from, to}) => {
    const mapContainerRef = useRef(null);
    const fromCoordinates = [iataData[from][1], iataData[from][0]]
    const toCoordinates = [iataData[to][1], iataData[to][0]]

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-98.0, 38.5], // Centered roughly between JFK and LAX
            zoom: 2.5,
        });

        new mapboxgl.Marker()
            .setLngLat(fromCoordinates) // Longitude, Latitude
            .addTo(map);

        new mapboxgl.Marker()
            .setLngLat(toCoordinates) // Longitude, Latitude
            .addTo(map);

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('load', () => {
            map.addSource('flight-path', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            fromCoordinates,
                            toCoordinates
                        ],
                    },
                },
            });

            map.addLayer({
                id: 'flight-path-line',
                type: 'line',
                source: 'flight-path',
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': '#000000',
                    'line-width': 1,
                },
            });
        });

        return () => map.remove();
    }, []);

    return <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '260px' }} />;
};

export default MapComponent;