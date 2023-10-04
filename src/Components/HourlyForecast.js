import React from 'react';

const FetchHourlyForecast = ({ hour, temperature, icon }) => {
  return (
    <div className="hourly-forecast-card">
      <p>{hour}</p>
      <p>{temperature}&deg;C</p>
      <i className={icon}></i>
    </div>
  );
}

export default FetchHourlyForecast;
