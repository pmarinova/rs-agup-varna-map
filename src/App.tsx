import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { PropertyCoordinates } from './Data';

import './App.css';

type Point = {
  lat: number,
  lng: number,
  title: string
};

function App() {

  const [points, setPoints] = useState([] as Point[]);

  const loadCoordinates = async () => {
    const res = await fetch(process.env.PUBLIC_URL + '/data/geo_coordinates.json');
    const coordinates = await res.json() as PropertyCoordinates;
    const points = Object.keys(coordinates).map((propertyId) => {
      const { x, y } = coordinates[propertyId];
      return { lat: x, lng: y, title: propertyId } as Point
    });
    setPoints(points);
  };

  useEffect(() => {
    loadCoordinates();
  }, [])

  const Markers = ({ data } : { data: Point[] }) => {
    return (
      <>
        {data.map(({ lat, lng, title }, index) => (
          <Marker key={index} position={{ lat, lng }}>
            <Popup>{title}</Popup>
          </Marker>
          ))}
      </>
    );
  }

  return (
    <div id="map">
      <MapContainer center={[43.2073873, 27.9166653]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers data={points} />
      </MapContainer>
    </div>
  );
}

export default App;