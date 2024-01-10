// ../features/Weather.js
import axios from 'axios';
import api from '../constant/Api';

const fetchWeather = async (search) => {
  try {
    // Make an API request to fetch weather data
    const response = await axios.get(`${api.base_url}/weather?q=${search}&appid=${api.key}`);
    
    // Return the weather data from the API response
    return response.data;
  } catch (error) {
     // If an error occurs, throw the error for handling
    throw error;
  }
};

export default fetchWeather;
