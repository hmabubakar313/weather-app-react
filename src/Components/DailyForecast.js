import React from 'react';


const fetchDailyForecast = ({ hour, maxTemp, min, icon }) => {
  
 
    return (
    
      <div className="d-inline-flex">
      <p>{hour}</p>
      
      <p>{min}&deg;C----------{maxTemp}&deg;C</p>
      <i>{icon}</i>
    </div>
     
    );
  }
  
  

export default fetchDailyForecast;
