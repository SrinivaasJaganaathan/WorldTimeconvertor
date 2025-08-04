import { Coordinates, LocationData } from '../types';

// Mock location data for demo purposes
const MOCK_LOCATIONS: LocationData[] = [
  // Major Cities - Americas
  { name: 'New York', country: 'United States', countryCode: 'US', timezone: 'America/New_York', lat: 40.7128, lon: -74.0060 },
  { name: 'Los Angeles', country: 'United States', countryCode: 'US', timezone: 'America/Los_Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Chicago', country: 'United States', countryCode: 'US', timezone: 'America/Chicago', lat: 41.8781, lon: -87.6298 },
  { name: 'Miami', country: 'United States', countryCode: 'US', timezone: 'America/New_York', lat: 25.7617, lon: -80.1918 },
  { name: 'Toronto', country: 'Canada', countryCode: 'CA', timezone: 'America/Toronto', lat: 43.6532, lon: -79.3832 },
  { name: 'Vancouver', country: 'Canada', countryCode: 'CA', timezone: 'America/Vancouver', lat: 49.2827, lon: -123.1207 },
  { name: 'Mexico City', country: 'Mexico', countryCode: 'MX', timezone: 'America/Mexico_City', lat: 19.4326, lon: -99.1332 },
  { name: 'São Paulo', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', lat: -22.9068, lon: -43.1729 },
  { name: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', timezone: 'America/Argentina/Buenos_Aires', lat: -34.6118, lon: -58.3960 },
  { name: 'Lima', country: 'Peru', countryCode: 'PE', timezone: 'America/Lima', lat: -12.0464, lon: -77.0428 },
  { name: 'Bogotá', country: 'Colombia', countryCode: 'CO', timezone: 'America/Bogota', lat: 4.7110, lon: -74.0721 },
  
  // Europe
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Berlin', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', lat: 52.5200, lon: 13.4050 },
  { name: 'Madrid', country: 'Spain', countryCode: 'ES', timezone: 'Europe/Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Rome', country: 'Italy', countryCode: 'IT', timezone: 'Europe/Rome', lat: 41.9028, lon: 12.4964 },
  { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', timezone: 'Europe/Amsterdam', lat: 52.3676, lon: 4.9041 },
  { name: 'Stockholm', country: 'Sweden', countryCode: 'SE', timezone: 'Europe/Stockholm', lat: 59.3293, lon: 18.0686 },
  { name: 'Moscow', country: 'Russia', countryCode: 'RU', timezone: 'Europe/Moscow', lat: 55.7558, lon: 37.6173 },
  { name: 'Istanbul', country: 'Turkey', countryCode: 'TR', timezone: 'Europe/Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'Athens', country: 'Greece', countryCode: 'GR', timezone: 'Europe/Athens', lat: 37.9755, lon: 23.7348 },
  { name: 'Vienna', country: 'Austria', countryCode: 'AT', timezone: 'Europe/Vienna', lat: 48.2082, lon: 16.3738 },
  { name: 'Prague', country: 'Czech Republic', countryCode: 'CZ', timezone: 'Europe/Prague', lat: 50.0755, lon: 14.4378 },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Seoul', country: 'South Korea', countryCode: 'KR', timezone: 'Asia/Seoul', lat: 37.5665, lon: 126.9780 },
  { name: 'Beijing', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', lat: 39.9042, lon: 116.4074 },
  { name: 'Shanghai', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', lat: 31.2304, lon: 121.4737 },
  { name: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', timezone: 'Asia/Hong_Kong', lat: 22.3193, lon: 114.1694 },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG', timezone: 'Asia/Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Bangkok', country: 'Thailand', countryCode: 'TH', timezone: 'Asia/Bangkok', lat: 13.7563, lon: 100.5018 },
  { name: 'Mumbai', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', lat: 28.7041, lon: 77.1025 },
  { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', timezone: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Tel Aviv', country: 'Israel', countryCode: 'IL', timezone: 'Asia/Jerusalem', lat: 32.0853, lon: 34.7818 },
  { name: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA', timezone: 'Asia/Riyadh', lat: 24.7136, lon: 46.6753 },
  { name: 'Jakarta', country: 'Indonesia', countryCode: 'ID', timezone: 'Asia/Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Manila', country: 'Philippines', countryCode: 'PH', timezone: 'Asia/Manila', lat: 14.5995, lon: 120.9842 },
  
  // Africa
  { name: 'Cairo', country: 'Egypt', countryCode: 'EG', timezone: 'Africa/Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Lagos', country: 'Nigeria', countryCode: 'NG', timezone: 'Africa/Lagos', lat: 6.5244, lon: 3.3792 },
  { name: 'Johannesburg', country: 'South Africa', countryCode: 'ZA', timezone: 'Africa/Johannesburg', lat: -26.2041, lon: 28.0473 },
  { name: 'Cape Town', country: 'South Africa', countryCode: 'ZA', timezone: 'Africa/Johannesburg', lat: -33.9249, lon: 18.4241 },
  { name: 'Nairobi', country: 'Kenya', countryCode: 'KE', timezone: 'Africa/Nairobi', lat: -1.2921, lon: 36.8219 },
  { name: 'Casablanca', country: 'Morocco', countryCode: 'MA', timezone: 'Africa/Casablanca', lat: 33.5731, lon: -7.5898 },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Melbourne', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Melbourne', lat: -37.8136, lon: 144.9631 },
  { name: 'Perth', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Perth', lat: -31.9505, lon: 115.8605 },
  { name: 'Auckland', country: 'New Zealand', countryCode: 'NZ', timezone: 'Pacific/Auckland', lat: -36.8485, lon: 174.7633 },
  { name: 'Wellington', country: 'New Zealand', countryCode: 'NZ', timezone: 'Pacific/Auckland', lat: -41.2865, lon: 174.7762 },
  
  // Additional Major Cities
  { name: 'Zurich', country: 'Switzerland', countryCode: 'CH', timezone: 'Europe/Zurich', lat: 47.3769, lon: 8.5417 },
  { name: 'Oslo', country: 'Norway', countryCode: 'NO', timezone: 'Europe/Oslo', lat: 59.9139, lon: 10.7522 },
  { name: 'Helsinki', country: 'Finland', countryCode: 'FI', timezone: 'Europe/Helsinki', lat: 60.1699, lon: 24.9384 },
  { name: 'Copenhagen', country: 'Denmark', countryCode: 'DK', timezone: 'Europe/Copenhagen', lat: 55.6761, lon: 12.5683 },
  { name: 'Brussels', country: 'Belgium', countryCode: 'BE', timezone: 'Europe/Brussels', lat: 50.8503, lon: 4.3517 },
  { name: 'Lisbon', country: 'Portugal', countryCode: 'PT', timezone: 'Europe/Lisbon', lat: 38.7223, lon: -9.1393 },
  { name: 'Warsaw', country: 'Poland', countryCode: 'PL', timezone: 'Europe/Warsaw', lat: 52.2297, lon: 21.0122 },
  { name: 'Budapest', country: 'Hungary', countryCode: 'HU', timezone: 'Europe/Budapest', lat: 47.4979, lon: 19.0402 }
];

export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

export const getLocationFromCoords = async (lat: number, lon: number): Promise<LocationData> => {
  try {
    // For demo purposes, find the closest mock location
    let closestLocation = MOCK_LOCATIONS[0];
    let minDistance = Number.MAX_VALUE;

    MOCK_LOCATIONS.forEach(location => {
      const distance = Math.sqrt(
        Math.pow(location.lat - lat, 2) + Math.pow(location.lon - lon, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = location;
      }
    });

    return closestLocation;
  } catch (error) {
    console.error('Failed to get location from coordinates:', error);
    // Return London as fallback
    return MOCK_LOCATIONS.find(loc => loc.name === 'London') || MOCK_LOCATIONS[0];
  }
};

export const searchLocations = async (query: string): Promise<LocationData[]> => {
  try {
    // For demo purposes, filter mock locations
    const normalizedQuery = query.toLowerCase();
    return MOCK_LOCATIONS.filter(location =>
      location.name.toLowerCase().includes(normalizedQuery) ||
      location.country.toLowerCase().includes(normalizedQuery)
    ).slice(0, 8); // Limit to 8 results
  } catch (error) {
    console.error('Failed to search locations:', error);
    return [];
  }
};
