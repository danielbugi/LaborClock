// useDarkMode.js
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    setIsDark(currentTheme === 'dark');
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    setIsLoaded(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prevIsDark) => {
      const newTheme = prevIsDark ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', !prevIsDark);
      return !prevIsDark;
    });
  };

  return { isDark, toggleDarkMode, isLoaded };
};

export default useDarkMode;
