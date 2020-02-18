import React from "react";
import Plant from "./Plant";

const PlantList = ({ plants, setPlantForm, setConfMessage, setPlants }) => {
  if (!plants || plants.length === 0)
    return (
      <>
        <div> No plants found! </div>
        <div
          onClick={() => setPlantForm(1)}
          className="card-body card-body-add card-body-add-np "
        >
          <i className="fas fa-plus"></i>{" "}
        </div>
      </>
    );

  return (
    <div className="card-list">
      {plants.map(plant => (
        <Plant
          key={plant.id}
          plant={plant}
          setConfMessage={setConfMessage}
          setPlants={setPlants}
          plants={plants}
        />
      ))}
      <div onClick={() => setPlantForm(1)} className="card-body card-body-add ">
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
};

export default PlantList;
