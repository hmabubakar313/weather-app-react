import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'
import CreateWeatherChart from './ChartForecast';
import UV from './UV';
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
          `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric`
        );

        const hourlyData = response.data.list.slice(0, 5);
        // console.log(hourlyData);


        // const hourlyData = response.data.list;
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
      <div className='row'>
        <div className='container-fluid'>
          <h1 className='location'>{locations}</h1>
          <div className="weather-data">
            {weather ? (
              <div className=''>
                <p className='temp'>{weather.main?.temp}°C</p>
                <p className='data'>Description: {weather?.weather?.[0]?.description}</p>
                <p className='long'>
                  Long : {weather?.coord?.lon} Lat: {weather?.coord?.lat}
                </p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </div>
      </div>



      <div className="row">
        <div className="col-md-4">
          <div className="card chart-card">
            <div className="card-header">Bar chart</div>
            <div className="card-body">
              <canvas id="weather-chart" className="chartjs-render-monitor">
                <CreateWeatherChart hourlyData={hourlyForecast} />
              </canvas>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card hourly-card">
            <div className="card-header">Bar chart</div>
            <div className="card-body">
            {hourlyForecast.map((hourlyData) => (
                <HourlyForecast
                  key={hourlyData.dt}
                  hour={hourlyData.dt_txt}
                  icon={`http://openweathermap.org/img/w/${hourlyData.weather[0].icon}.png`}
                  min={hourlyData.main.temp_min}
                  maxTemp={hourlyData.main.temp_max}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* row ended here */}
      <div className='row'>
        <div className='col-sm-4'>
          <div className='card daily-card'>
            <div className='card-body '>
              <div>  <h2 className='card-title'>Daily Forecast</h2></div>
              {dailyForecast.map((dailyData) => (
                <DailyForecast
                  key={dailyData.dt}
                  hour={dailyData.dt_txt}
                  icon={`http://openweathermap.org/img/w/${dailyData.weather[0].icon}.png`}
                  min={dailyData.main.temp_min}
                  maxTemp={dailyData.main.temp_max}
                />
              ))}
            </div>
          </div>
        </div>
        {/* col end here  */}

        <div className='col-sm-4'>
          {
            console.log('dailyForecast', dailyForecast)
          }
          <UV dailyData={dailyForecast} />
        </div>

      </div>


    </div>
  );
}

export default ApiCall;
