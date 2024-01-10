// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context to manage the theme state
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // State to manage the current theme
  const [theme, setTheme] = useState('light');

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // // Provide the theme context value to the child components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
