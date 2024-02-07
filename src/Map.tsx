import React from 'react';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import { BuildingPermit, PropertyCoordinates } from './Data';
import { BuildingPermitMarker } from './Marker';

type BuildingPermitsMapData = {
  permits: BuildingPermit[];
  coordinates: PropertyCoordinates;
};

type BuildingPermitsMapProps = {
  data: BuildingPermitsMapData;
};

const BuildingPermitsMap = ({ data }: BuildingPermitsMapProps) => (
  <div id="map">
    <MapContainer center={[43.2073873, 27.9166653]} zoom={12} scrollWheelZoom={true} zoomControl={false}>
      <ZoomControl position={'topright'} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.permits.filter((permit) => data.coordinates[permit.propertyId]).map((permit) => (
        <BuildingPermitMarker
          key={permit.id}
          permit={permit}
          coordinates={data.coordinates[permit.propertyId]}
        />
      ))}
    </MapContainer>
  </div>
);

export type { BuildingPermitsMapData };
export { BuildingPermitsMap };