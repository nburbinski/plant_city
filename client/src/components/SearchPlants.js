import React, { useState } from "react";
import plantService from "../services/plants";

const SearchPlants = () => {
  const [plant, setPlant] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();

    console.log(await plantService.getAll());
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        className=""
        type="text"
        value={plant}
        onChange={e => setPlant(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchPlants;
