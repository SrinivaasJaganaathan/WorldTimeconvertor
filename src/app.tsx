import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Settings, Sun, Moon, Plus, RotateCcw } from 'lucide-react';
import LocationCard from './components/LocationCard';
import TimeConverter from './components/TimeConverter';
import LocationInput from './components/LocationInput';
import ThemeToggle from './components/ThemeToggle';
import { Location, WeatherData } from './types';
import { getWeatherData } from './services/weatherService';
import { getCurrentLocation, getLocationFromCoords } from './services/locationService';

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [customTime, setCustomTime] = useState<Date | null>(null);
  const [isConverterMode, setIsConverterMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Get user's current location on app start
  useEffect(() => {
    initializeUserLocation();
  }, []);

  const initializeUserLocation = async () => {
    try {
      setLoading(true);
      const coords = await getCurrentLocation();
      const locationData = await getLocationFromCoords(coords.latitude, coords.longitude);
      const weather = await getWeatherData(coords.latitude, coords.longitude);
      
      const primaryLocation: Location = {
        id: '1',
        name: locationData.name,
        country: locationData.country,
        countryCode: locationData.countryCode,
        timezone: locationData.timezone,
        lat: coords.latitude,
        lon: coords.longitude,
        weather,
        isPrimary: true
      };
      
      setLocations([primaryLocation]);
    } catch (error) {
      console.error('Failed to get user location:', error);
      // Set a default location (London) if geolocation fails
      const defaultLocation: Location = {
        id: '1',
        name: 'London',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'Europe/London',
        lat: 51.5074,
        lon: -0.1278,
        weather: null,
        isPrimary: true
      };
      setLocations([defaultLocation]);
      // Try to get weather for default location
      try {
        const weather = await getWeatherData(51.5074, -0.1278);
        setLocations([{ ...defaultLocation, weather }]);
      } catch (weatherError) {
        console.error('Failed to get weather for default location:', weatherError);
      }
    } finally {
      setLoading(false);
    }
  };

  const addLocation = async (locationData: any) => {
    if (locations.length >= 3) return;
    
    try {
      const weather = await getWeatherData(locationData.lat, locationData.lon);
      
      const newLocation: Location = {
        id: Date.now().toString(),
        name: locationData.name,
        country: locationData.country,
        countryCode: locationData.countryCode,
        timezone: locationData.timezone,
        lat: locationData.lat,
        lon: locationData.lon,
        weather,
        isPrimary: false
      };
      
      setLocations(prev => [...prev, newLocation]);
      setShowAddLocation(false);
    } catch (error) {
      console.error('Failed to add location:', error);
    }
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id && loc.isPrimary));
  };

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const resetToCurrentTime = () => {
    setCustomTime(null);
    setIsConverterMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  World Time Converter Pro
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track time across the globe
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isConverterMode && (
                <button
                  onClick={() => setIsConverterMode(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Time Converter</span>
                </button>
              )}
              
              {isConverterMode && (
                <button
                  onClick={resetToCurrentTime}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset Time</span>
                </button>
              )}
              
              <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Converter */}
        {isConverterMode && locations.length > 0 && (
          <div className="mb-8">
            <TimeConverter
              primaryLocation={locations[0]}
              customTime={customTime}
              onTimeChange={setCustomTime}
            />
          </div>
        )}

        {/* Locations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              customTime={customTime}
              primaryLocation={locations[0]}
              onRemove={location.isPrimary ? undefined : () => removeLocation(location.id)}
            />
          ))}
          
          {/* Add Location Card */}
          {locations.length < 3 && (
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center min-h-[200px] transition-colors duration-200">
              {showAddLocation ? (
                <LocationInput
                  onLocationSelect={addLocation}
                  onCancel={() => setShowAddLocation(false)}
                />
              ) : (
                <button
                  onClick={() => setShowAddLocation(true)}
                  className="flex flex-col items-center space-y-3 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 group"
                >
                  <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-200">
                    <Plus className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Add Location</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-600 dark:text-gray-500">
          <p className="text-sm">
            Time updates automatically every minute. Click "Time Converter" to adjust times manually.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
