import React, { useState, useEffect } from "react";
import axios from "axios";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
// import CreateWeatherChart from "./ChartForecast";
import UV from "./UV";
import SunTime from "./SunTime";
import Aqi from "./Aqi";
import Map from "./Maps";
import Wind from "./Wind";
import PoP from "./PoP";



function ApiCall() {
  const weatherKey = "970e51d81ae2059072ee1e195d4a3db5";
  const apiKey = "vYyUh2tVNbH47tYBvQ3rfKrbvf2AaB7f";
  const startDate = new Date("2023-10-01T00:00:00Z");
  const endDate = new Date("2023-12-31T23:59:59Z");
  const lat = 31.5204;
  const long = 74.3587;

  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("Lahore");
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, sethourlyForecast] = useState([]);
  const [uvi, setUVI] = useState([]);
  const [sunSet, setSunSet] = useState([]);
  const [sunRise, setSunRise] = useState([]);
  const [aqi, setAqi] = useState([]);
  const [pop, setPop] = useState(0);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [popNext24Hours,setPopNext24Hours] = useState([])

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
        console.log("response", response);
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

        const hourlyData = response.data.list.slice(0, 8);
        console.log("in the fetch hourly forecast", hourlyData);

        // const hourlyData = response.data.list;

        sethourlyForecast(hourlyData);
      } catch (error) {
        console.error("Error fetching hourly forecast:", error);
      }
    };

    fetchDailyForecast();
    fetchHourlyForecast();
    UVI();
    sunSetsunRise();
    getAQI();
    POP();
    getWindData()
  }, []);
  const UVI = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${weatherKey}`
      );

      const uvi = response.data.value;
      setUVI(uvi);
      console.log("UV Index:", uvi);
    } catch (error) {
      console.error("Error fetching UV index:", error);
    }
  };

  const sunSetsunRise = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&cnt=7&start_date=${startTimestamp}&end_date=${endTimestamp}`
      );

      const sunriseTimestamp = response.data.city.sunrise;
      const sunsetTimestamp = response.data.city.sunset;

      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      const formattedSunrise = sunriseDate.toLocaleTimeString();
      const formattedSunset = sunsetDate.toLocaleTimeString();

      console.log("Sunrise:", formattedSunrise);
      console.log("Sunset:", formattedSunset);

      setSunRise(formattedSunrise);
      setSunSet(formattedSunset);
    } catch (error) {
      console.error("Error fetching sunrise/sunset forecast:", error);
    }
  };

  const getAQI = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${weatherKey}`
      );

      const aqi = response.data.list[0].main.aqi;
      setAqi(aqi);
      // console.log("aqi", aqiValue);
    } catch (error) {
      console.error("Error fetching AQI:", error);
    }
  };
  const POP = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&cnt=7&start_date=${startTimestamp}&end_date=${endTimestamp}`
      );
      const forecastList = response.data.list;
      const pop = forecastList[0].pop;
      setPop(pop);
      console.log("POP value for the first forecast time:", pop);
      const popNext24Hours = forecastList
      .slice(0, 8) // Consider the next 8 forecast times (assuming data is available every 3 hours)
      .reduce((totalPop, forecast) => totalPop + forecast.pop, 0);
      setPopNext24Hours(popNext24Hours);
      console.log("Total POP for the next 24 hours:", popNext24Hours);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const getWindData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${locations}&APPID=${weatherKey}&units=metric&cnt=7`
      );
      const forecastList = response.data.list;
  
      // Assuming you want the wind data for the first forecast time
      const windSpeed = forecastList[0].wind.speed;
      const windDirection = forecastList[0].wind.deg;
  
      // Update your state or variables with the new wind data
      setWindSpeed(windSpeed);
      setWindDirection(windDirection);
  
      console.log("Wind data for the first forecast time:", windSpeed, windDirection);
    } catch (error) {
      console.error("Error fetching wind data:", error);
    }
  };
  
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="container-fluid p-0">
            {dailyForecast && dailyForecast.length > 0 ? (
              <div className="weather-data">
                <h1 className="location">{locations}</h1>
                <h2 className="temp">{dailyForecast[0].main?.temp}°C</h2>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-8">
            <div className="card text-light bg-dark">
              <h2 className="card-title text-left text-light">
                Hourly Forecast
              </h2>
              <div className="card-body">
                {hourlyForecast.map((hourlyData) => (
                  <HourlyForecast
                    key={hourlyData.dt}
                    hour={hourlyData.dt_txt.split(" ")[1].slice(0, 5)}
                    temperature={hourlyData.main.temp}
                    icon={weatherIcons[hourlyData.weather[0].icon]}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-4">
            <Map pop={pop} />
          </div>
        </div>
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
                      hour={dailyData.dt_txt.split(" ")[0]}
                      icon={weatherIcons[dailyData.weather[0].icon]}
                      min={dailyData.main.temp_min}
                      maxTemp={dailyData.main.temp_max}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <Aqi aqi={aqi} />
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <UV uvi={uvi} />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <SunTime time={{ sunRise, sunSet }} />
                 
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-2">
            <Wind speed={windSpeed} direction={windDirection} />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-2">
            <PoP pop={pop} popNext24Hours={popNext24Hours} />
            </div>
          
      </div>
    </div>

    </>
  );
}

export default ApiCall;
