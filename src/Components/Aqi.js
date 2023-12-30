import React from "react";

const Aqi = ({aqi}) => {
    
   
  return (
    <div className="uv-index-card bg-dark text-white">
      <h4 className="uv-index-title text-center">Air Polution Index</h4>
     <strong> <p className="text-center">Aqi: {aqi}</p></strong>
      {/* <br></br> */}
      
    </div>
  );
};

export default Aqi;
