import React, { useState } from "react";
import plantService from "../services/plants";
import OutsideAlerter from "./OutsideAlerter";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PlantForm = ({ plantForm, setPlantForm, setPlants }) => {
  const [plantName, setPlantName] = useState("");
  const [location, setLocation] = useState("Inside");
  const [light, setLight] = useState("Indirect Light");
  const [water, setWater] = useState("Top 1/2 inch is dry");
  const [otherWater, setOtherWater] = useState("Top 1/2 inch is dry");
  const [startDate, setStartDate] = useState(new Date());

  if (plantForm === 0) return <></>;

  const handleSubmit = async event => {
    event.preventDefault();

    const plant = {
      name: plantName,
      location: location,
      light: light,
      water: otherWater,
      date: startDate
    };

    plantService
      .create(plant)
      .then(response => console.log(response))
      .catch(error => console.log(error));

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
      <div className="plant-form">
        <h1>Add a new plant</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <div className="form-label text-right">Plant Name: </div>
            <div className="col" sm={5}>
              <input
                className="form-control"
                type="text"
                value={plantName}
                onChange={({ target }) => setPlantName(target.value)}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <div className="form-label text-right">Water requirements: </div>
            <div className="col" sm={5}>
              <select
                className="form-control"
                value={water}
                onChange={({ target }) =>
                  setWater(target.value) && setOtherWater(target.value)
                }
              >
                <option>Top 1/2 inch is dry</option>
                <option>Top 1 inch is dry</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                className={water === "Other" ? "form-control" : "d-none "}
                value={otherWater}
                onChange={({ target }) => setOtherWater(target.value)}
              ></input>
            </div>
          </div>{" "}
          <div className="form-group">
            <div className="form-label text-right">Light requirements:</div>
            <div className="col">
              <select
                className="form-control"
                onChange={({ target }) => setLight(target.value)}
              >
                <option>Bright Light</option>
                <option>Indirect Light</option>
                <option>Partial Shade</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-label text-right">Location: </div>
            <div className="col" sm={5}>
              <select
                className="form-control"
                onChange={({ target }) => setLocation(target.value)}
              >
                <option>Inside</option>
                <option>Outside</option>
              </select>
            </div>
          </div>
          <div>
            Last Watered:{" "}
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
            />{" "}
          </div>
          <div>
            <button className="btn " type="submit">
              Add Plant!
            </button>
            <button className="btn " onClick={() => setPlantForm(0)}>
              Cancel
            </button>
          </div>
        </form>
      </div>{" "}
    </OutsideAlerter>
  );
};

export default PlantForm;
