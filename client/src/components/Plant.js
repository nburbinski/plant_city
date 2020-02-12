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
      <h4 className="card-title">{plant.name}</h4>
      <i class="fas fa-leaf fa-sm card-image"></i>

      <ul>
        <li className="card-text">Water: {plant.water}</li>
        <li className="card-text">Light: {plant.light}</li>
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
