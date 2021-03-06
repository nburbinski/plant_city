import React, { useState } from "react";
import plantService from "../services/plants";
import OutsideAlerter from "./OutsideAlerter";

const PlantForm = ({
  plantForm,
  setPlantForm,
  setPlants,
  setConfMessage,
  plants
}) => {
  const [plantName, setPlantName] = useState("");
  const [light, setLight] = useState("Indirect Light");
  const [water, setWater] = useState("Top 1/2 inch is dry");
  const [otherWater, setOtherWater] = useState("");
  const [lastWatered, setLastWatered] = useState(new Date());

  if (plantForm === 0) return <></>;

  const handleSubmit = async event => {
    event.preventDefault();

    // Place date in Date format
    setLastWatered(new Date(lastWatered));

    if (water === "Other") {
      const plant = {
        name: plantName,
        light: light,
        water: otherWater,
        lastWatered: [lastWatered]
      };

      plantService
        .create(plant)
        .then(response => setPlants(plants.concat(response)))
        .catch(error => setConfMessage([error.message, 0]));
    } else {
      const plant = {
        name: plantName,
        light: light,
        water: water,
        lastWatered: [lastWatered]
      };

      plantService
        .create(plant)
        .then(response => setPlants(plants.concat(response)))
        .catch(error => setConfMessage([error.message, 0]));
    }
    setPlantName("");
    setWater("Top 1/2 inch is dry");
    setLight("Indirect Light");
    setLastWatered(new Date());
    setPlantForm(0);
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
            onChange={({ target }) => setWater(target.value)}
          >
            <option>Top 1/2 inch is dry</option>
            <option>Top 1 inch is dry</option>
            <option>Other</option>
          </select>
          <input
            className={water === "Other" ? "plant-form-input" : "hidden"}
            placeholder="Water requirements..."
            value={otherWater}
            onChange={({ target }) => setOtherWater(target.value)}
          ></input>
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
          ></input>
          <p className="plant-form-p">
            *Leaving the date blank will default to today's date
          </p>
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
