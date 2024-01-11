import React from 'react';

const Wind = ({ speed, direction }) => {
  // Convert the wind direction in degrees to a CSS rotation
  const rotationStyle = {
    transform: `rotate(${direction - 90}deg)`, // OpenWeather API gives meteorological degrees, subtract 90 to align with CSS
  };

  return (
    <div className="uv-index-card bg-dark text-white">
        <div className="d-flex align-items-center justify-content-center ">
      <div className="fs-1" style={rotationStyle}>↑</div> {/* Bootstrap fs-1 for font-size */}
      <div className="ms-2">{speed} mph</div> {/* Bootstrap ms-2 for margin start */}
    </div>
    </div>
  );
};

export default Wind;
