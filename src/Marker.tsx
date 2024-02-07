import React from 'react';

import Typography from '@mui/material/Typography';

import { Marker as LeafletMarker } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';

import { BuildingPermit, Coordinates } from './Data';

type BuildingPermitMarkerProps = {
  permit: BuildingPermit;
  coordinates: Coordinates;
  openPopup?: boolean;
};

const BuildingPermitMarker = ({ permit, coordinates, openPopup }: BuildingPermitMarkerProps) => {
  const map = useMap();
  const markerRef = React.useRef<LeafletMarker>(null);

  React.useEffect(() => {
    if (openPopup && markerRef.current) {
      map.flyToBounds([[coordinates.x, coordinates.y]], { maxZoom: 18 });
      markerRef.current.openPopup();
    }
  }, [map, coordinates, openPopup]);

  return (
    <Marker ref={markerRef} position={{ lat: coordinates.x, lng: coordinates.y }}>
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
};

export type { BuildingPermitMarkerProps };
export { BuildingPermitMarker };