import { WeatherData } from '../types';

const WEATHER_API_KEY = 'demo_key'; // Users should replace with their own OpenWeatherMap API key
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    // For demo purposes, return mock data if no API key is provided
    if (WEATHER_API_KEY === 'demo_key') {
      return {
        temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
        condition: ['Clear', 'Cloudy', 'Partly Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        description: 'pleasant weather'
      };
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      description: data.weather[0].description
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
};
