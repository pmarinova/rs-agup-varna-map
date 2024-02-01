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

export type {
  Coordinates,
  PropertyCoordinates,
  BuildingPermit
};