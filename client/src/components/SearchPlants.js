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
      <form onSubmit={handleSubmit}>
        <p>What plant would you like to search for?</p>
        <input onChange={e => setPlant(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPlants;
