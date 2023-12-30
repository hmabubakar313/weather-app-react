import React from "react";

const SunTime = ({time}) => {
    const { sunRise, sunSet } = time;
  return (
    <div className="uv-index-card bg-dark text-white">
      <h4 className="uv-index-title text-center">Sunrise</h4>
     <strong> <p className="text-center"> {sunRise}</p></strong>
      {/* <br></br> */}
      <h4 className="uv-index-title text-center">Sunset</h4>
      <p className="text-center"> {sunSet}</p>
    </div>
  );
};

export default SunTime;
