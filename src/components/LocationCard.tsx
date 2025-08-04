import React, { useState, useEffect } from 'react';
import { Sun, Moon, MapPin, Thermometer, X } from 'lucide-react';
import { Location } from '../types';
import { formatTime, getTimeDifference, isDaytime } from '../utils/timeUtils';

interface LocationCardProps {
  location: Location;
  customTime?: Date | null;
  primaryLocation: Location;
  onRemove?: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  customTime,
  primaryLocation,
  onRemove
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const displayTime = customTime || currentTime;
  const formattedTime = formatTime(displayTime, location.timezone);
  const timeDiff = location.id !== primaryLocation.id ? 
    getTimeDifference(displayTime, primaryLocation.timezone, location.timezone) : null;
  const isDay = isDaytime(displayTime, location.timezone);

  const getFlagEmoji = (countryCode: string) => {
    return countryCode
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:hover:bg-gray-800">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getFlagEmoji(location.countryCode)}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {location.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {location.country}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {location.isPrimary && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
              Primary
            </span>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Time Display */}
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {formattedTime.time}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4">
          <span>{formattedTime.date}</span>
          <span className="flex items-center justify-center">
            {isDay ? (
              <>
                <Sun className="w-4 h-4 mr-1 text-yellow-500" />
                Day
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-1 text-blue-400" />
                Night
              </>
            )}
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          UTC{formattedTime.offset}
        </div>
      </div>

      {/* Time Difference */}
      {timeDiff && (
        <div className="text-center mb-4">
          <span className={`text-sm px-3 py-1 rounded-full ${
            timeDiff.includes('ahead') 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
          }`}>
            {timeDiff}
          </span>
          {customTime && (
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {formattedTime.dayLabel}
            </div>
          )}
        </div>
      )}

      {/* Weather */}
      {location.weather && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={getWeatherIcon(location.weather.icon)}
                alt={location.weather.condition}
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {location.weather.condition}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {location.weather.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-lg font-semibold text-gray-900 dark:text-white">
              <Thermometer className="w-4 h-4" />
              <span>{Math.round(location.weather.temperature)}°C</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default LocationCard;
