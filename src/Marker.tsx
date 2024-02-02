import React from 'react';

import Typography from '@mui/material/Typography';
import { Marker, Popup } from 'react-leaflet';
import { BuildingPermit, Coordinates } from './Data';

type BuildingPermitMarkerProps = {
  permit: BuildingPermit;
  coordinates: Coordinates;
};

const BuildingPermitMarker = ({ permit, coordinates }: BuildingPermitMarkerProps) => (
  <Marker position={{ lat: coordinates.x, lng: coordinates.y }}>
    <Popup>
      <Typography variant="subtitle2">
        Разрешение {permit.id}
      </Typography>
      <Typography variant="body2">
        {permit.description}
      </Typography>
    </Popup>
  </Marker>
);

export type { BuildingPermitMarkerProps };
export { BuildingPermitMarker };