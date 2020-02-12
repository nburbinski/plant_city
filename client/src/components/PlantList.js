import React from "react";
import Plant from "./Plant";

const PlantList = ({ plants }) => {
  if (!plants)
    return <div> No plants added yet! or Server cannot be reached </div>;

  return (
    <div className="card-list">
      {plants.map(plant => (
        <Plant key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;
