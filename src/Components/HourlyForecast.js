import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

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
