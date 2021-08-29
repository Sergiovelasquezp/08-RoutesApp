export interface Coords {
  latitude: number;
  longitude: number;
}

export interface CoordsData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface CoordsResponse {
  coords: CoordsData;
  mocked: boolean;
  timestamp: number;
}

export interface CoordsClass {
  accuracy: number;
  altitude: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}
