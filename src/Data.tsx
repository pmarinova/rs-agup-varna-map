type Coordinates = {
    x: number;
    y: number;
};

type PropertyCoordinates = {
    [propertyId: string] : Coordinates;
};

export type { PropertyCoordinates };