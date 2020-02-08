import React from "react";
import Plant from "./Plant";

const PlantList = ({ plants }) => {
  if (plants === null) return <div> No plants added yet! </div>;

  return (
    <div className="container">
      <div className="card-deck">
        {plants.map(plant => (
          <Plant key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default PlantList;
