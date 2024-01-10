import { useEffect,useState } from 'react';
import { toast } from "react-toastify";

import { useTheme } from "../context/ThemeContext";
import {Search} from "./Search";
import {History} from "./HistoryContainer";
import "../styles/Container.css";
import fetchWeather  from '../features/Weather';

import darkBg from "../assets/bg-dark.png";
import lightBg from "../assets/bg-light.png";
import sunImage from '../assets/sun.png';
import cloudImage from '../assets/cloud.png';

function Container() {
     // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [historyArray, setHistoryArray] = useState([]);

  // Theme context
  const { theme } = useTheme();

  // Function to handle input change in search bar
  const handleInputChange = (search) => {
    setSearch(search);
  };

  // Function to handle search button click
  const onClick = () => {
    fetchData(search);
    setSearch("");
    setIsFocused(false);
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      hourCycle: 'h12',
    });
    // Push search history to array
    historyArray.push({
      city: weatherData.name,
      country: weatherData.sys.country,
      date: formattedDate.toString()
    });
  };

  // Function to handle search history item click
  const onClickSearch = (value) => {
    console.log("value");
    console.log(value);
    fetchData(value);
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      hourCycle: 'h12',
    });
    // Push search history to array
    historyArray.push({
      city: weatherData.name,
      country: weatherData.sys.country,
      date: formattedDate.toString()
    });
  }

  // Function to handle search history item delete
  const onClickDelete = (index) => {
    let tempArray = [...historyArray];
    if (index >= 0 && index < tempArray.length) {
      // Check if the index is valid
      tempArray.splice(index, 1);
    }
    setHistoryArray(tempArray);
  }

  // Function to handle search bar focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle search bar blur
  const handleBlur = () => {
    if (search === "") {
      setIsFocused(false);
    }
  };

  // Function to fetch weather data
  const fetchData = async (search) => {
    setIsDataLoading(true);
    try {
      const data = await fetchWeather(search);
      setWeatherData(data);
    } catch (error) {
      toast.error(error.message);
      console.error('Error fetching weather data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // useEffect hook to fetch initial weather data
  useEffect(() => {
    fetchData("Singapore");
  }, []);

  // Function to convert Kelvin to Celsius
  const convertKelvinToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(0);
  };

  // Function to get formatted date in timezone
  const getDateTimeInTimeZone = (dt, offsetSeconds) => {
    const dateObject = new Date((dt * 1000) - (offsetSeconds * 1000));
    const date = new Date(dateObject);

    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      hourCycle: 'h12',
    });

    return formattedDate.toString();
  }

  // Render component
  return (
    <div
  id="main"
  style={{
    backgroundImage: `url(${theme === "dark" ? darkBg : lightBg})`,
  }}
> {/* Search component */}
       <Search searchValue={search} handleInputChange={handleInputChange} onClick={onClick} handleFocus={handleFocus} handleBlur={handleBlur} isFocused={isFocused} />
        {/* Weather container */}
       <div className="weatherContainer" style={{backgroundColor: theme==="dark"?`rgba(26, 26, 26, 0.30)`:`#ffffff33`}}>
       {isDataLoading ? (
  <div>Loading...</div>
) : (
    weatherData !== null ? (
      <>
      {/* Display weather information */}
      <img src={weatherData.weather[0].main === "Clouds" ? cloudImage : sunImage}></img>
      <div className="normalText" style={{color: theme==="dark"? `#FFF`:`#000`}}>Today's Weather</div>
      <div id="degree" style={{color: theme==="dark"? `#FFF`:`#6C40B5`}}>{convertKelvinToCelsius(weatherData.main.temp)}°</div>
      <div className="normalText" style={{paddingTop:"0px",color: theme==="dark"? `#FFF`:`#000`}}>H:{convertKelvinToCelsius(weatherData.main.temp_max)}° L:{convertKelvinToCelsius(weatherData.main.temp_min)}°</div>
      <div className="detailsContainer">
      <div id="country" className="detailsText" style={{color: theme==="dark"? `#FFF`:`#666`}}>{weatherData.name}, {weatherData.sys.country}</div>
      <div className="detailsText" style={{color: theme==="dark"? `#FFF`:`#666`}}>{getDateTimeInTimeZone(weatherData.dt, weatherData.timezone)}</div>
      <div id="humidity" className="detailsText" style={{color: theme==="dark"? `#FFF`:`#666`}}>Humidity: {weatherData.main.humidity}%</div>
      <div id="weatherType" className="detailsText" style={{color: theme==="dark"? `#FFF`:`#666`}}>{weatherData.weather[0].main}</div>
      </div>
      </>
        ) : (
            //Display message when there is no data available
            <div>No weather data available</div>
          )
       )}
       {/* History component */}
       <History historyArray={historyArray} onClickSearch={onClickSearch} onClickDelete={onClickDelete}/>
       </div>
    </div>
  );
}

export default Container;