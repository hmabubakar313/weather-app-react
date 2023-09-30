import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'

function ApiCall() {
  const weatherKey = '970e51d81ae2059072ee1e195d4a3db5';

  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState('Lahore');
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, sethourlyForecast] = useState([])

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


  const fetchDailyForecast = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&cnt=7`
      );
      const dailyData = response.data.list;
      console.log(dailyData);
      setDailyForecast(dailyData);
    } catch (error) {
      console.error('Error fetching daily forecast:', error);
    }
  };

  useEffect(() => {
    fetchDailyForecast();
    fetchHourlyForecast();
  }, [locations]);

  const fetchHourlyForecast = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric`
      );
      const hourlyData = response.data.list;
      console.log('hourlyData', hourlyData);
      sethourlyForecast(hourlyData);
    } catch (error) {
      console.error('Error fetching daily forecast:', error);
    }
  };


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
      <div className='row'>
        <div className='col-md-4'>
          <div className="card" >
            {dailyForecast.map((dailyData) => (
              <DailyForecast
                key={dailyData.dt}
                hour={dailyData.dt_txt}
                temperature={dailyData.main.temp}
                icon={dailyData.weather.icon}
              />
            ))}
          </div>
        </div>
        <div className='card'>
          <div className='col-md-8'>
            <div className="d-flex flex-row">
              {hourlyForecast.map((hourData, index) => (
                <HourlyForecast
                  key={index}
                  hour={hourData.dt}
                  temperature={hourData.main.temp}
                  icon={hourData.weather.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

export default ApiCall;
