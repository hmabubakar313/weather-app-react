import React, { useState,useEffect } from 'react';
import axios from 'axios'
import HourlyForecastCard from './HourlyForecast';

function ApiCall() {
  const weatherKey = '970e51d81ae2059072ee1e195d4a3db5';
 
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState('Lahore');
  
  const handleSearch = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${weatherKey}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error! (wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));

    
  };

  const [hourlyForecast, setHourlyForecast] = useState([]);

  const fetchHourlyForecast = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric`
      );
      const hourlyData = response.data.list;
      console.log(hourlyData)
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
    }
  };

  useEffect(() => {
    fetchHourlyForecast();
  }, [locations]); 

  return (
    <div>
      <h1>{locations}</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location"
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="weather-data">
        
        <p className='temp'>Temperature: {weather?.main?.temp}°C</p>
        <p className='data'>Description: {weather?.weather?.[0]?.description}</p>
        <p className='long'>Long : {weather?.coord?.lon} Lat: {weather?.coord?.lat}  </p>
      </div>
      <div className="hourly-forecast">
        {hourlyForecast.map((hourData) => (
          <HourlyForecastCard
            key={hourData.dt}
            hour={hourData.dt_txt} 
            temperature={hourData.main.temp}
            icon={hourData.weather.icon}

            
          />
        ))}
      </div>
      
    </div>
  );
}

export default ApiCall;
