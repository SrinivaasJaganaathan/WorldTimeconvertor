export interface Location {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  lat: number;
  lon: number;
  weather: WeatherData | null;
  isPrimary: boolean;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  description: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  name: string;
  country: string;
  countryCode: string;
  timezone: string;
  lat: number;
  lon: number;
}
