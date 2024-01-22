import { Marker, Popup } from 'react-leaflet';
import { BuildingPermit, Coordinates } from './Data';

type BuildingPermitMarkerProps = {
    permit: BuildingPermit;
    coordinates: Coordinates;
};

const BuildingPermitMarker = ({ permit, coordinates }: BuildingPermitMarkerProps) => (
    <Marker position={{ lat: coordinates.x, lng: coordinates.y }}>
        <Popup>{permit.description}</Popup>
    </Marker>
);

export type { BuildingPermitMarkerProps };
export { BuildingPermitMarker };