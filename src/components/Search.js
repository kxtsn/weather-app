/**
 * Search Component for handling user input and search functionality.
 * 
 * @param {string} props.searchValue - Current value of the search input.
 * @param {Function} props.handleInputChange - Function to handle input change.
 * @param {Function} props.onClick - Function to handle search button click.
 * @param {Function} props.handleFocus - Function to handle input focus.
 * @param {Function} props.handleBlur - Function to handle input blur.
 * @param {boolean} props.isFocused - Flag indicating whether the input is focused.
 */

import React from 'react';

import "../styles/Search.css";
import { useTheme } from "../context/ThemeContext";
import ThemeSwitcher from './ThemeSwitcher'; 

import SearchIcon from '@mui/icons-material/Search';

export const Search = ({ searchValue, handleInputChange, onClick, handleFocus, handleBlur, isFocused }) => {
     // Access theme from the context
    const { theme } = useTheme();

    // Render Component
    return (
        <div className="search">
            <div className="search-container" style={{backgroundColor: theme==="dark"? `rgba(26, 26, 26, 0.50)`:`#ffffff33`}}>
                 {/* Search input label */}
                <label
                    className="text-label"
                    htmlFor="search"
                    style={{ fontSize: isFocused ? '0.8em' : '1.2em', transition: 'font-size 0.3s', paddingTop: isFocused ? '5px' : '18px',color: theme==="dark"? `lightGrey`:`#00000066` }}
                >
                    Country
                </label>
                 {/* Search input field */}
                <input
                    className="input"
                    style={{color: theme==="dark"? `#FFF`:`#000`}}
                    type="text"
                    id="search"
                    value={searchValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
            </div>
             {/* Search button */}
            <button onClick={onClick} className="buttonStyle"  style={{backgroundColor: theme==="dark"? `#1A1A1A`:`#6c3fb4`}}>
                <SearchIcon style={{ color: '#FFF', fontSize: 30 }} className="iconStyle" />
            </button>
             {/* ThemeSwitcher component */}
            <ThemeSwitcher />
        </div>
    );
};
