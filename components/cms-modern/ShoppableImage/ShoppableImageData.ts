export interface ShoppableImagePoi {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ShoppableImagePoint {
    x: number;
    y: number;
}

export interface ShoppableImageHotspot {
    id: string;
    selector: string;
    points: ShoppableImagePoint;
    target: string;
}

export interface ShoppableImagePolygon {
    id: string;
    selector: string;
    points: ShoppableImagePoint[];
    target: string;
}

export interface ShoppableImageData {
    poi?: ShoppableImagePoi;
    hotspots?: ShoppableImageHotspot[];
    polygons?: ShoppableImagePolygon[];
}
