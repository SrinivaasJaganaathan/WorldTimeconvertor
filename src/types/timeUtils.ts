export const formatTime = (date: Date, timezone: string) => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const time24Formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const isoDateFormatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    // Get UTC offset
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offsetMs = tzDate.getTime() - utcDate.getTime();
    const offsetHours = offsetMs / (1000 * 60 * 60);
    const offsetSign = offsetHours >= 0 ? '+' : '';
    const offset = `${offsetSign}${offsetHours.toFixed(0).padStart(2, '0')}:00`;

    return {
      time: formatter.format(date),
      date: dateFormatter.format(date),
      time24: time24Formatter.format(date),
      dateISO: isoDateFormatter.format(date),
      offset,
      dayLabel: getDayLabel(date, timezone, 'UTC')
    };
  } catch (error) {
    console.error('Error formatting time:', error);
    return {
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
      time24: date.toLocaleTimeString('en-GB', { hour12: false }),
      dateISO: date.toISOString().split('T')[0],
      offset: '+00:00',
      dayLabel: ''
    };
  }
};

export const getTimeDifference = (date: Date, fromTimezone: string, toTimezone: string): string => {
  try {
    const fromTime = new Date(date.toLocaleString('en-US', { timeZone: fromTimezone }));
    const toTime = new Date(date.toLocaleString('en-US', { timeZone: toTimezone }));
    
    const diffMs = toTime.getTime() - fromTime.getTime();
    const diffHours = Math.abs(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'Same time';
    }
    
    const hours = Math.floor(diffHours);
    const minutes = Math.round((diffHours - hours) * 60);
    
    const timeString = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    
    return diffMs > 0 
      ? `${timeString} ahead`
      : `${timeString} behind`;
  } catch (error) {
    console.error('Error calculating time difference:', error);
    return 'Unknown';
  }
};

export const isDaytime = (date: Date, timezone: string): boolean => {
  try {
    const hour = parseInt(
      new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false
      }).format(date)
    );
    
    return hour >= 6 && hour < 18; // Consider 6 AM to 6 PM as daytime
  } catch (error) {
    console.error('Error determining day/night:', error);
    return true;
  }
};

export const getDayLabel = (date: Date, timezone: string, referenceTimezone: string): string => {
  try {
    const targetDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const refDate = new Date(date.toLocaleString('en-US', { timeZone: referenceTimezone }));
    
    const targetDay = targetDate.getDate();
    const refDay = refDate.getDate();
    
    if (targetDay > refDay) {
      return 'Next day';
    } else if (targetDay < refDay) {
      return 'Previous day';
    } else {
      return 'Same day';
    }
  } catch (error) {
    return '';
  }
};
