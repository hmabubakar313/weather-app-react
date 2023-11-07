import React, { useState, useEffect } from "react";
import axios from "axios";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CreateWeatherChart from "./ChartForecast";
import UV from "./UV";
function ApiCall() {
  const weatherKey = "970e51d81ae2059072ee1e195d4a3db5";
  const startDate = new Date("2023-10-01T00:00:00Z");
  const endDate = new Date("2023-12-31T23:59:59Z");

  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("Lahore");
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, sethourlyForecast] = useState([]);

  const weatherIcons = {
    "01d": "fas fa-sun",
    "01n": "fas fa-moon",
    "02d": "fas fa-cloud-sun",
    "02n": "fas fa-cloud-moon",
    "03d": "fas fa-cloud",
    "03n": "fas fa-cloud",
    "04d": "fas fa-cloud",
    "04n": "fas fa-cloud",
    "09d": "fas fa-cloud-showers-heavy",
    "09n": "fas fa-cloud-showers-heavy",
    "10d": "fas fa-cloud-rain",
    "10n": "fas fa-cloud-rain",
    "11d": "fas fa-bolt",
    "11n": "fas fa-bolt",
    "13d": "fas fa-snowflake",
    "13n": "fas fa-snowflake",
    "50d": "fas fa-smog",
    "50n": "fas fa-smog",
    200: "fas fa-bolt",
    201: "fas fa-bolt",
    202: "fas fa-bolt",
    210: "fas fa-bolt",
    211: "fas fa-bolt",
    212: "fas fa-bolt",
    221: "fas fa-bolt",
    230: "fas fa-bolt",
    231: "fas fa-bolt",
    232: "fas fa-bolt",
    300: "fas fa-cloud-rain",
    301: "fas fa-cloud-rain",
    302: "fas fa-cloud-rain",
    310: "fas fa-cloud-rain",
    311: "fas fa-cloud-rain",
    312: "fas fa-cloud-rain",
    313: "fas fa-cloud-rain",
    314: "fas fa-cloud-showers-heavy",
    321: "fas fa-cloud-showers-heavy",
    500: "fas fa-cloud-showers-heavy",
    501: "fas fa-cloud-showers-heavy",
    502: "fas fa-cloud-showers-heavy",
    503: "fas fa-cloud-showers-heavy",
    504: "fas fa-cloud-showers-heavy",
    511: "fas fa-cloud-showers-heavy",
    520: "fas fa-cloud-showers-heavy",
    521: "fas fa-cloud-showers-heavy",
    522: "fas fa-cloud-showers-heavy",
    531: "fas fa-cloud-showers-heavy",
    600: "fas fa-snowflake",
    601: "fas fa-snowflake",
    602: "fas fa-snowflake",
    611: "fas fa-snowflake",
    612: "fas fa-snowflake",
    613: "fas fa-snowflake",
    615: "fas fa-snowflake",
    616: "fas fa-snowflake",
    620: "fas fa-snowflake",
    621: "fas fa-snowflake",
    622: "fas fa-snowflake",
    701: "fas fa-smog",
    711: "fas fa-smog",
    721: "fas fa-smog",
    731: "fas fa-smog",
    741: "fas fa-smog",
    751: "fas fa-smog",
    761: "fas fa-smog",
    762: "fas fa-smog",
    771: "fas fa-smog",
    781: "fas fa-smog",
    800: "fas fa-sun",
    801: "fas fa-cloud-sun",
    802: "fas fa-cloud",
    803: "fas fa-cloud",
    804: "fas fa-cloud",
  };

  // const handleSearch = () => {
  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${weatherKey}&units=metric`
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         console.log(res.status);
  //         return res.json();
  //       } else {
  //         if (res.status === 404) {
  //           return alert("Oops, there seems to be an error! (wrong location)");
  //         }
  //         alert("Oops, there seems to be an error!");
  //         throw new Error("You have an error");
  //       }
  //     })
  //     .then((object) => {
  //       setWeather(object);
  //       console.log(weather);
  //     })
  //     .catch((error) => console.log(error));

  // };

  useEffect(() => {
    const fetchDailyForecast = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&cnt=7&start_date=${startTimestamp}&end_date=${endTimestamp}`
        );
        const dailyData = response.data.list;

        console.log("DailyForecast", dailyData);
        setDailyForecast(dailyData);
      } catch (error) {
        console.error("Error fetching daily forecast:", error);
      }
    };

    const fetchHourlyForecast = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric`
        );

        const hourlyData = response.data.list.slice(0, 14);
        console.log("in the fetch hourly forecast",hourlyData);

        // const hourlyData = response.data.list;
       

        sethourlyForecast(hourlyData);
      } catch (error) {
        console.error("Error fetching hourly forecast:", error);
      }
    };

    fetchDailyForecast();
    fetchHourlyForecast();
  }, []);

  return (
    <>
      <div className="row">
        <div className="container-fluid p-0">
          {dailyForecast && dailyForecast.length > 0 ? (
            <div className="weather-data">
              <h1 className="location">{locations}</h1>
              <h2 className="temp">{dailyForecast[0].main?.temp}°C</h2>
              {/* <p className='long'>
              Long: {dailyForecast[0]?.coord?.lon} Lat: {dailyForecast[0]?.coord?.lat}
        </p> */}
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </div>

      <div className="row ">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <div className="card text-light bg-dark">
            <div className="card-title text-left text-light"> Hourly Forecast</div>
            <div className="card-body text-center">
              {hourlyForecast.map((hourlyData) => (
                <HourlyForecast
                  key={hourlyData.dt}
                  hour={hourlyData.dt_txt.split(" ")[1].slice(0, 5)}
                  icon={weatherIcons[hourlyData.weather[0].icon]}
                  min={hourlyData.main.temp_min}
                  maxTemp={hourlyData.main.temp_max}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* First row ended here */}

      <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="card bg-dark text-light">
            <div>
                  
                  <h2 className="card-title text-left">Daily Forecast</h2>
                </div>
              <div className="card-body text-center">
               
                {dailyForecast.map((dailyData) => (
                  <DailyForecast
                    key={dailyData.dt}
                    hour={dailyData.dt_txt.split(" ")[0]} // Extract only the date part
                    icon={weatherIcons[dailyData.weather[0].icon]}
                    min={dailyData.main.temp_min}
                    maxTemp={dailyData.main.temp_max}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            {console.log("dailyForecast", dailyForecast)}
            <UV dailyData={dailyForecast} />
          </div>
        </div>
      {/* Second column */}
     
    </>
  );
}

export default ApiCall;
