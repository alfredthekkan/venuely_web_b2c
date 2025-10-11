// lib/date-utils.ts
import { addDays, format } from "date-fns";

/**
 * Generates an array of the next 14 dates, starting from tomorrow.
 * @returns {Array<{date: Date, label: string, value: string}>}
 */
export const getNextTwoWeeksDates = () => {
  const dates = [];
  // Start from 1 day after today (tomorrow)
  for (let i = 1; i <= 14; i++) {
    const date = addDays(new Date(), i);
    dates.push({
      date: date,
      // Friendly label: "Fri, Oct 11"
      label: format(date, "EEE, MMM d"), 
      // Value for state/API: "2025-10-11"
      value: format(date, "yyyy-MM-dd"), 
    });
  }
  return dates;
};

// Extend the Date interface to include to12hrTime
declare global {
  interface Date {
    to12hrTime(): string;
  }
}

Date.prototype.to12hrTime = function() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', // Use 'numeric' for 1-12 hours, '2-digit' for 01-12
    minute: 'numeric', // Use 'numeric' for 0-59 minutes, '2-digit' for 00-59
    hour12: true // Set to true for AM/PM format
  });

  return formatter.format(this);
}