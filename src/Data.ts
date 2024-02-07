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

type Data = {
  permits: BuildingPermit[];
  coordinates: PropertyCoordinates;
}

async function loadData(): Promise<Data> {
  let permits: BuildingPermit[] = [];
  let coordinates: PropertyCoordinates = {};
  const YEAR_FROM = 2020;
  const YEAR_TO = 2024;
  for (let year = YEAR_FROM; year <= YEAR_TO; year++) {
    permits = [ ...permits, ...(await loadBuildingPermits(year)) ];
    coordinates = { ...coordinates, ...(await loadPropertyCoordinates(year)) };
  }
  return { permits, coordinates };
}

async function loadBuildingPermits(year: number) {
  const res = await fetch(process.env.PUBLIC_URL + `/data/${year}/building_permits.json`);
  const permits = await res.json() as BuildingPermit[];
  return permits;
}

async function loadPropertyCoordinates(year: number) {
  const res = await fetch(process.env.PUBLIC_URL + `/data/${year}/geo_coordinates.json`);
  const coordinates = await res.json() as PropertyCoordinates;
  return coordinates;
}

export type {
  Coordinates,
  PropertyCoordinates,
  BuildingPermit,
  Data
};

export {
  loadData
};