import React from "react";
import Plant from "./Plant";

const PlantList = ({ plants, setPlantForm, setConfMessage }) => {
  if (!plants)
    return <div> No plants added yet! or Server cannot be reached </div>;

  return (
    <div className="card-list">
      {plants.map(plant => (
        <Plant key={plant.id} plant={plant} setConfMessage={setConfMessage} />
      ))}
      <div onClick={() => setPlantForm(1)} className="card-body card-body-add ">
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
};

export default PlantList;
