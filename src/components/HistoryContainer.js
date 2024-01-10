/**
 * History Component displays the search history.
 * 
 * @param {Array} props.historyArray - Array containing search history items.
 * @param {Function} props.onClickSearch - Function to handle search item click.
 * @param {Function} props.onClickDelete - Function to handle delete item click.
 */

import React from 'react';

import "../styles/HistoryContainer.css";
import { useTheme } from "../context/ThemeContext";

import BinIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export const History = ({historyArray, onClickSearch, onClickDelete  }) => {
    // Access theme from the context
    const { theme } = useTheme();

    //Render component
    return (
        <div className="history-container">
        <div className="history" style={{backgroundColor: theme==="dark"? `rgba(26, 26, 26, 0.30)`:`#ffffff33`}}>
        <div className="text-style" id="title" style={{color: theme==="dark"? `#FFF`:`#000`}}>Search History</div>
         {/* Check if there is search history */}
        {historyArray !== null && historyArray.length > 0 ? (
                    // Map through each search history item
                    historyArray.map((item, index) => (
                            <div className="search-detail-container"  style={{backgroundColor: theme==="dark"?`rgba(26, 26, 26, 0.50)`:`#ffffff66`}}>
                            <div key={index} className="search-detail">
                                <div style={{paddingLeft:'21px', color: theme==="dark"?`#fff`:`#000`}}>{item.city}, {item.country}</div>
                                <div style={{color: theme==="dark"?`rgba(255, 255, 255, 0.50)`:`#000`}}>{item.date}</div>
                            </div>
                            <div key={index} className="search-buttons-container">
                                 {/* Search button */}
                            <button onClick={() =>onClickSearch(item.city)} className="search-button" style={{backgroundColor: theme==="dark"?`rgba(26, 26, 26, 0.30)`:`#FFF`, outline: theme==="dark"? `2px solid grey`:`none`}}>
                <SearchIcon style={{ color: 'gray', fontSize: 20 }} className="iconStyle" />
            </button>
             {/* Delete button */}
            <button onClick={() =>onClickDelete(index)} className="search-button" style={{backgroundColor: theme==="dark"?`rgba(26, 26, 26, 0.30)`:`#FFF`, outline: theme==="dark"? `2px solid grey`:`none`}}>
                <BinIcon style={{ color: 'gray', fontSize: 20 }} className="iconStyle" />
            </button>
                            </div>
                            </div>
                        ))
                   
                ) : (
                     // Display message when there is no search history
                    <div className="text-style" style={{paddingLeft:'26px',color: theme==="dark"? `#FFF`:`#000`}}>No search history available</div>
                )}
        </div>
        </div>
    );
};
