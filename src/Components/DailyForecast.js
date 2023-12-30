import React from "react";

const fetchDailyForecast = ({ hour, maxTemp, min, icon }) => {
  return (
    <div className="row mb-3">
    <div className="col-lg-12">
      <div className="row align-items-center">
        <div className="col-4">
          <p className="mb-0">{hour}</p>
        </div>
        <div className="col-4">
          <p className="mb-0">{min}°C -- {maxTemp}°C</p>
        </div>
        <div className="col-4">
          <i className={icon}></i>
        </div>
      </div>
    </div>
  </div>
  );
};

export default fetchDailyForecast;
