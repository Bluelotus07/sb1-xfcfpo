import { useState, useEffect } from 'react';

export const useReminder = () => {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Check if we should show the reminder
    const checkLastReminder = () => {
      const lastReminder = localStorage.getItem('lastReminderTime');
      const now = new Date().getTime();
      
      if (!lastReminder || now - parseInt(lastReminder) >= 24 * 60 * 60 * 1000) {
        setShowReminder(true);
        localStorage.setItem('lastReminderTime', now.toString());
      }
    };

    // Initial check
    checkLastReminder();

    // Set up 24-hour interval
    const interval = setInterval(checkLastReminder, 24 * 60 * 60 * 1000);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  const dismissReminder = () => {
    setShowReminder(false);
  };

  return { showReminder, dismissReminder };
};