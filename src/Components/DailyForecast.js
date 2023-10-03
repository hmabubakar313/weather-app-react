import React from 'react';


const fetchDailyForecast = ({ hour, maxTemp, min, icon }) => {
  
 
    return (
    
        <div>
          <table>
            <td>
              <tr>
                {hour}
              </tr>
            </td>
            <td>
              <tr>
                <img src={icon} alt='Icon'/>
              </tr>
              
            </td>
            <td>
              <tr>
                {maxTemp}---{min}
              </tr>
            </td>
          </table>
        </div>
     
    );
  }
  
  

export default fetchDailyForecast;
