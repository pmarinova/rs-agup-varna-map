import React, { useEffect, useState } from 'react';
import { BuildingPermit, PropertyCoordinates } from './Data';
import { BuildingPermitsMap, BuildingPermitsMapData } from './Map';
import './App.css';

const loadBuildingPermits = async () => {
  const res = await fetch(process.env.PUBLIC_URL + '/data/building_permits.json');
  const permits = await res.json() as BuildingPermit[];
  return permits;
};

const loadPropertyCoordinates = async () => {
  const res = await fetch(process.env.PUBLIC_URL + '/data/geo_coordinates.json');
  const coordinates = await res.json() as PropertyCoordinates;
  return coordinates;
};

function App() {

  const [data, setData] = useState({ permits: [], coordinates: {}} as BuildingPermitsMapData);
  
  useEffect(() => {
    
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
  
  return <BuildingPermitsMap data={data} />;
}

export default App;