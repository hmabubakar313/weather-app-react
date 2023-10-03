import React from 'react';

const UV = ({ dailyData }) => {
  // Assuming that the UV index is available in the first daily forecast
  const currentUVI = dailyData.length > 0 ? dailyData[0].uvi : null;

  return (
    <div className="uv-index-card">
      <h3 className="uv-index-title">UV Index</h3>
      {currentUVI !== null ? (
        <>
          <p className="uv-index-number">{currentUVI}</p>
          <p className="uv-index-description">{getUVIDescription(currentUVI)}</p>
        </>
      ) : (
        <p className="uv-index-unavailable">UV Index not available</p>
      )}
    </div>
  );
};

// Helper function to get a description based on the UV index value
const getUVIDescription = (uvi) => {
  if (uvi <= 2) {
    return 'Low';
  } else if (uvi <= 5) {
    return 'Moderate';
  } else if (uvi <= 7) {
    return 'High';
  } else if (uvi <= 10) {
    return 'Very High';
  } else {
    return 'Extreme';
  }
};

export default UV;
