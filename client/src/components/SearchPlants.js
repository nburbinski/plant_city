import React, { useState } from "react";
import plantService from "../services/plants";

const SearchPlants = () => {
  const [plant, setPlant] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();

    console.log(await plantService.getAll());
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form-inline md-form mr-auto mb-4"
      >
        <input
          className="form-control mr-sm-2"
          type="text"
          value={plant}
          onChange={e => setPlant(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn primary btn-rounded btn-sm my-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPlants;
