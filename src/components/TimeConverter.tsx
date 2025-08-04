import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Location } from '../types';
import { formatTime } from '../utils/timeUtils';

interface TimeConverterProps {
  primaryLocation: Location;
  customTime: Date | null;
  onTimeChange: (time: Date) => void;
}

const TimeConverter: React.FC<TimeConverterProps> = ({
  primaryLocation,
  customTime,
  onTimeChange
}) => {
  const [inputTime, setInputTime] = useState('');
  const [inputDate, setInputDate] = useState('');

  useEffect(() => {
    const now = customTime || new Date();
    const formatted = formatTime(now, primaryLocation.timezone);
    setInputTime(formatted.time24);
    setInputDate(formatted.dateISO);
  }, [customTime, primaryLocation.timezone]);

  const handleTimeChange = (time: string, date: string) => {
    if (!time || !date) return;
    
    try {
      // Create a date in the primary location's timezone
      const dateTimeString = `${date}T${time}:00`;
      const localDate = new Date(dateTimeString);
      
      // Get the timezone offset for the primary location
      const tempDate = new Date();
      const utc1 = tempDate.getTime() + (tempDate.getTimezoneOffset() * 60000);
      const utc2 = new Date(utc1 + (getTimezoneOffset(primaryLocation.timezone) * 3600000));
      
      // Adjust for the difference
      const timezoneOffset = getTimezoneOffset(primaryLocation.timezone);
      const adjustedDate = new Date(localDate.getTime() - (timezoneOffset * 3600000));
      
      onTimeChange(adjustedDate);
    } catch (error) {
      console.error('Error parsing date/time:', error);
    }
  };

  const getTimezoneOffset = (timezone: string): number => {
    try {
      const now = new Date();
      const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
      const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
      const localTime = new Date(utc.toLocaleString('en-US'));
      return (targetTime.getTime() - localTime.getTime()) / (1000 * 3600);
    } catch {
      return 0;
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-500 rounded-lg">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Time Converter
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Adjust time for {primaryLocation.name} to see conversions
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
            Date
          </label>
          <input
            type="date"
            value={inputDate}
            onChange={(e) => {
              setInputDate(e.target.value);
              handleTimeChange(inputTime, e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
            Time
          </label>
          <input
            type="time"
            value={inputTime}
            onChange={(e) => {
              setInputTime(e.target.value);
              handleTimeChange(e.target.value, inputDate);
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-200">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Change the date and time above to see how it converts across all your locations. 
          Other location cards will update automatically with the converted times.
        </p>
      </div>
    </div>
  );
};

export default TimeConverter;
