import React from 'react';
import {Card,Row,Col,Container} from 'react-bootstrap'
const fetchDailyForecast = ({ hour, temperature, maxTemp,min,icon }) => {
  return (
    <div>
          
        <td>
          <tr >{hour}</tr>
        </td>
        <td>
          <tr  > <img src={icon} alt="Weather Icon" /></tr>
        </td>
     
        <td className='temp'>
          <tr>{min}---{maxTemp}&deg;C</tr>
        </td>
        

    </div>

  );
}



export default fetchDailyForecast;
