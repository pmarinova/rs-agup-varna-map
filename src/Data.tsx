type Coordinates = {
    x: number;
    y: number;
};

type PropertyCoordinates = {
    [propertyId: string] : Coordinates;
};

type BuildingPermit = {
    sequenceNumber: number;
    date: string;
    propertyId: string;
    ekatteCode: number;
    regionNumber: number;
    propertyNumber: number;
    description: string;
};

type BuildingPermits = {
    [id: string] : BuildingPermit;
};

export type {
    Coordinates,
    PropertyCoordinates,
    BuildingPermit,
    BuildingPermits
};