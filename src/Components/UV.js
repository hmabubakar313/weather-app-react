import React from "react";

const getUVIDescription = (uvi) => {
  console.log("asdasad inside the getUVI", uvi);
  let description = "";
  let color = "";

  if (uvi <= 2) {
    description = "Low: " + uvi;
    color = "#2ECC71";
  } else if (uvi <= 5) {
    description = "Moderate: " + uvi;
    color = "#F1C40F";
  } else if (uvi <= 7) {
    description = "High: "+uvi;
    color = "#E67E22";
  } else if (uvi <= 10) {
    description = "Very High: "+uvi;
    color = "#E74C3C";
  } else {
    description = "Extreme: "+uvi;
    color = "#9B59B6";
  }

  return { description, color };
};

const UV = ({ uvi }) => {
  console.log("asd", uvi);

  const currentUVI = uvi;

  console.log("UVI", currentUVI);
  const uvData = getUVIDescription(uvi);

  console.log("asdasd", uvData);

  return (
    <div className="uv-index-card bg-dark text-white">
      <h3 className="uv-index-title">UV Index</h3>

      {currentUVI !== null ? (
        <>
          <p className="uv-index-description" style={{ color: uvData.color }}>
            {uvData.description}
          </p>
        </>
      ) : (
        <p className="uv-index-unavailable">UV Index not available</p>
      )}
    </div>
  );
};

export default UV;
