import React from "react";
import plantService from "../services/plants";

const Plant = ({ plant }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${plant.title} ?`)) {
      plantService.deletePlant(plant.id);
    }
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h4 className="card-title">{plant.name}</h4>
        <p className="card-text">Water: {plant.water}</p>
        <p className="card-text">Location: {plant.location}</p>
        <p className="card-text">Light: {plant.light}</p>

        <button
          className="btn btn-danger"
          variant="primary"
          onClick={handleDelete}
        >
          Delete?
        </button>
      </div>
    </div>
  );
};

export default Plant;
