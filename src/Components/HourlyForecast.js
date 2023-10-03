import React from 'react';

const FetchHourlyForecast = ({ hour, temperature, icon }) => {
  return (
    <div className="hourly-forecast-card">
      <p>{hour}</p>
      <p>{temperature}&deg;C</p>
      <img src={icon} alt="Weather Icon" />
    </div>
  );
}

export default FetchHourlyForecast;
