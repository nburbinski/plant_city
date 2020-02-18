import React, { useState } from "react";

const SearchPlants = ({ plants, setPlants, allPlants }) => {
  const [searchPlant, setSearchPlant] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();

    const filteredList = allPlants.filter(
      plant =>
        plant.name.toLowerCase().indexOf(searchPlant.toLowerCase()) !== -1
    );
    console.log(filteredList);
    setPlants(filteredList);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        className=""
        type="text"
        value={searchPlant}
        onChange={e => setSearchPlant(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-search" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchPlants;
