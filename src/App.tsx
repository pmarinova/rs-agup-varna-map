import React from 'react';
import './App.css';

import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <div id="map">
      <MapContainer center={[43.2073873, 27.9166653]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;