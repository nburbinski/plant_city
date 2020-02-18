import React, { useState } from "react";
import plantService from "../services/plants";

const Plant = ({ plant, setConfMessage, setPlants, plants }) => {
  // Place date into proper format
  // Grab last watered date in array
  const correctedDate = new Date(
    plant.lastWatered[plant.lastWatered.length - 1]
  );

  // Correct format of date
  const formatted_date =
    correctedDate.getFullYear() +
    "-" +
    // Returns date without 0 and html type date requires 0
    `${correctedDate.getMonth() + 1 > 9 ? "" : "0"}${correctedDate.getMonth() +
      1}` +
    "-" +
    correctedDate.getDate();

  // Manage state
  const [startDate, setStartDate] = useState(formatted_date);

  // Send update
  const updatePlant = async () => {
    // Increase day by 1
    var date = startDate.split("-");
    date[2] = parseInt(date[2]) + 1;
    const newDate = date.join("-");

    const newLastWatered = plant.lastWatered;
    newLastWatered.push(newDate);

    const newPlant = {
      ...plant,
      lastWatered: newLastWatered
    };
    try {
      await plantService.update(plant.id, newPlant);
    } catch (error) {
      setConfMessage([error.message, 0]);
    }

    setConfMessage(["Succesfully Updated Plant! ", 1]);
  };

  // Handle Delete
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${plant.name}?`)) {
      try {
        plantService.deletePlant(plant.id);
        const newPlants = plants.filter(p => p.id !== plant.id);
        setPlants(newPlants);
      } catch (error) {
        setConfMessage([error.message, 0]);
      }
    }
  };
  return (
    <div className="card-body">
      <h4 className="card-title">
        {plant.name} <i className="fas fa-leaf fa-sm card-image"></i>
      </h4>
      <ul>
        <li className="card-text">
          <p className="card-text-title">Water</p>
          <p>{plant.water}</p>
        </li>
        <li className="card-text">
          <p className="card-text-title">Light</p>
          <p>{plant.light}</p>
        </li>
        <li className="card-text">
          <p className="card-text-title">Last Watered</p>
          <input
            type="date"
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          ></input>
          <button className="btn btn-update" onClick={updatePlant}>
            Update
          </button>
        </li>
      </ul>
      <i className=" btn-danger fas fa-trash-alt" onClick={handleDelete}></i>
    </div>
  );
};

export default Plant;
