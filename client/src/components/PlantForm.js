import React, { useState } from "react";
import plantService from "../services/plants";
import OutsideAlerter from "./OutsideAlerter";

const PlantForm = ({ plantForm, setPlantForm, setPlants, setConfMessage }) => {
  const [plantName, setPlantName] = useState("");
  const [location, setLocation] = useState("Inside");
  const [light, setLight] = useState("Indirect Light");
  const [water, setWater] = useState("Top 1/2 inch is dry");
  const [otherWater, setOtherWater] = useState("Top 1/2 inch is dry");
  const [lastWatered, setLastWatered] = useState(new Date());

  if (plantForm === 0) return <></>;

  const handleSubmit = async event => {
    event.preventDefault();

    // Place date in Date format
    setLastWatered(new Date(lastWatered));

    const plant = {
      name: plantName,
      location: location,
      light: light,
      water: otherWater,
      lastWatered: [lastWatered]
    };

    plantService
      .create(plant)
      .then(response => console.log(response))
      .catch(error => setConfMessage(error.message));

    plantService.getAll().then(plants => {
      setPlants(plants.data);
    });

    setPlantName("");
    setWater("");

    setPlantForm(0);

    return;
  };

  return (
    <OutsideAlerter setPlantForm={setPlantForm}>
      <form onSubmit={handleSubmit} className="plant-form">
        <h1>Add a new plant</h1>
        <div className="form-group">
          <div className="plant-form-query">Plant Name: </div>
          <input
            className="plant-form-input"
            type="text"
            placeholder="Enter plant name here..."
            value={plantName}
            onChange={({ target }) => setPlantName(target.value)}
          ></input>
        </div>
        <div className="form-group">
          <div className="plant-form-query">Water requirements: </div>
          <select
            className=""
            value={water}
            onChange={({ target }) =>
              setWater(target.value) && setOtherWater(target.value)
            }
          >
            <option>Top 1/2 inch is dry</option>
            <option>Top 1 inch is dry</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <div className="plant-form-query">Light requirements:</div>
          <select
            className="l"
            onChange={({ target }) => setLight(target.value)}
          >
            <option>Bright Light</option>
            <option>Indirect Light</option>
            <option>Partial Shade</option>
          </select>
        </div>
        <div className="form-group">
          <div className="plant-form-query">Last Watered:</div>
          <input
            type="date"
            className="plant-form-input"
            onChange={({ target }) => setLastWatered(target.value)}
          ></input>{" "}
        </div>
        <button className="btn " type="submit">
          Add Plant!
        </button>
        <button className="btn btn-cancel " onClick={() => setPlantForm(0)}>
          Cancel
        </button>
      </form>
    </OutsideAlerter>
  );
};

export default PlantForm;
