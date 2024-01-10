/**
 * ThemeSwitcher Component for toggling between dark and light themes.
 */

import React from 'react';

import { useTheme } from '../context/ThemeContext';
import "../styles/ThemeSwitcher.css"; 

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

const ThemeSwitcher = () => {
    // Access theme and toggleTheme function from the context
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switch-container" style={{backgroundColor: theme==="dark"? `#1A1A1A`:`#6c3fb4`}}>
    {/* Checkbox and label for theme switch */}
    <label className="theme-switch" onChange={toggleTheme}>
    <input type="checkbox" checked={theme === 'dark'} />
    
     {/* Display DarkMode icon for dark theme, and LightMode icon for light theme */}
    {theme === 'dark' ? <LightMode style={{color:"#fff"}}/> : <DarkMode style={{color:"#fff"}}/>}
  </label>
  </div>
  );
};

export default ThemeSwitcher;
