import { MediaImageLink } from "dc-extensions-sdk/dist/types/lib/components/MediaLink";

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
  image: MediaImageLink;
  poi?: ShoppableImagePoi;
  hotspots?: ShoppableImageHotspot[];
  polygons?: ShoppableImagePolygon[];
}