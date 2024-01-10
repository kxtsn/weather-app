/**
 * API configuration object for OpenWeatherMap.
 * @property {string} base_url - Base URL for OpenWeatherMap API.
 * @property {string} key - API key for accessing OpenWeatherMap data.
 */

const api = {
    base_url: "https://api.openweathermap.org/data/2.5",
    key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  };
  
  export default api;