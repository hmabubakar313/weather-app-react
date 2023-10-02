import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'
import CreateWeatherChart from './ChartForecast';
function ApiCall() {
  const weatherKey = '970e51d81ae2059072ee1e195d4a3db5';
  const startDate = new Date('2023-10-01T00:00:00Z'); 
const endDate = new Date('2023-12-31T23:59:59Z');   

const startTimestamp = Math.floor(startDate.getTime() / 1000);
const endTimestamp = Math.floor(endDate.getTime() / 1000);


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

  useEffect(() => {
    const fetchDailyForecast = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&cnt=7&start_date=${startTimestamp}&end_date=${endTimestamp}`
        );
        const dailyData = response.data.list;
        setDailyForecast(dailyData);
      } catch (error) {
        console.error('Error fetching daily forecast:', error);
      }
    };

    const fetchHourlyForecast = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&start_date=${startTimestamp}&end_date=${endTimestamp}`
        );
        
        const hourlyData = response.data.list;
        console.log('hourlyData', hourlyData);
        
        sethourlyForecast(hourlyData);
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
      }
    };

    fetchDailyForecast();
    fetchHourlyForecast();
  }, []);



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
        <div class="page-content page-container" id="page-content">
          <div class="padding">
            <div class="container-fluid d-flex justify-content-center">
              <div class="col-sm-8 col-md-6">
                <div class="card">
                  <div class="card-header">Bar chart</div>
                  <div class="card-body" style={{ height: '420px' }}>
                    <canvas id="weather-chart" class="chartjs-render-monitor">
                      <CreateWeatherChart hourlyData={hourlyForecast} />
       
                    </canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-4'>


        


          <div className="card daily-card" >
            {dailyForecast.map((dailyData) => (
              <DailyForecast
                key={dailyData.dt}
                hour={dailyData.dt_txt}
                temperature={dailyData.main.temp}
                icon={dailyData.weather[0].icon}
              />
            ))}
          </div>
        </div>
        <div className='col-md-8'>
          <div className="card hourly-card">
            <div className='d-flex flex-row'>
              {hourlyForecast.map((hourData, index) => (
                <HourlyForecast
                  key={index}
                  hour={hourData.dt_txt}
                  temperature={hourData.main.temp}
                  icon={hourData.weather[0].icon}
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
