import React, { useState } from "react";
import plantService from "../services/plants";

const Plant = ({ plant }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDelete = () => {
    if (window.confirm(`Delete ${plant.title} ?`)) {
      plantService.deletePlant(plant.id);
    }
  };
  return (
    <div className="card-body">
      <h4 className="card-title">
        {plant.name} <i className="fas fa-leaf fa-sm card-image"></i>
      </h4>
      <ul>
        <li className="card-text">
          <p className="card-text-title">Water:</p>
          <p>{plant.water}</p>
        </li>
        <li className="card-text">
          <p className="card-text-title">Light:</p>
          <p>{plant.light}</p>
        </li>
      </ul>
      <button
        className="btn btn-danger card-btn"
        variant="primary"
        onClick={handleDelete}
      >
        Delete?
      </button>
    </div>
  );
};

export default Plant;
