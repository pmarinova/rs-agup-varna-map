import React from 'react';
import './App.css';

import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <div id="map">
      <MapContainer center={[42.7339, 25.4858]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;