import React from "react";

const PoP = ({pop,popNext24Hours}) => {
    
   
  return (
    <>
    <div className="uv-index-card bg-dark text-white text-center">
     the probality of percipation is:
     <strong>   {pop}</strong>
    
   
     <p className="mt-2"><strong >{popNext24Hours}</strong>:POP is expected in the next 24 hours</p>
    </div>
    </>
  );
};

export default PoP;
