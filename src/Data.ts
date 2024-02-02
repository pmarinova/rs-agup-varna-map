type Coordinates = {
  x: number;
  y: number;
};

type PropertyCoordinates = {
  [propertyId: string]: Coordinates;
};

type BuildingPermit = {
  id: string;
  sequenceNumber: number;
  date: string;
  propertyId: string;
  ekatteCode: number;
  regionNumber: number;
  propertyNumber: number;
  description: string;
};

async function loadBuildingPermits() {
  const res = await fetch(process.env.PUBLIC_URL + '/data/building_permits.json');
  const permits = await res.json() as BuildingPermit[];
  return permits;
}

async function loadPropertyCoordinates() {
  const res = await fetch(process.env.PUBLIC_URL + '/data/geo_coordinates.json');
  const coordinates = await res.json() as PropertyCoordinates;
  return coordinates;
}

export type {
  Coordinates,
  PropertyCoordinates,
  BuildingPermit
};

export {
  loadBuildingPermits,
  loadPropertyCoordinates
};