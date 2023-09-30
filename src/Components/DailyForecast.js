import React from 'react';
import {Card,Row,Col,Container} from 'react-bootstrap'
const fetchDailyForecast = ({ hour, temperature, icon }) => {
  return (
    <div class="container-fluid content-row">
    <div class="row">
        <div class="col-sm-12 col-lg-6">
          
        <td>
          <tr >{hour}</tr>
        </td>
        <td>
          <tr className='ml-2'>{temperature}&deg;C</tr>
        </td>
        <td>
          <tr  ><img src='' alt='icon'/></tr>
        </td>
        
      </div>
    </div>

    </div>

  );
}



export default fetchDailyForecast;
