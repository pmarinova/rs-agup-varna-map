import React from 'react';

import { Container } from '@mui/material';

import { loadBuildingPermits, loadPropertyCoordinates } from './Data';
import { BuildingPermitsMap, BuildingPermitsMapData } from './Map';

import './App.css';

function App() {

  const [data, setData] = React.useState<BuildingPermitsMapData>({ permits: [], coordinates: {} });

  React.useEffect(() => {
    const loadData = async () => {
      const buildingPermits = await loadBuildingPermits();
      const propertyCoordinates = await loadPropertyCoordinates();
      setData({
        permits: buildingPermits.filter(permit => propertyCoordinates[permit.propertyId]),
        coordinates: propertyCoordinates
      });
    };
    loadData();
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <BuildingPermitsMap data={data} />
    </Container>
  );
}

export default App;