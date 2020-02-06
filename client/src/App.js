import React from "react";

import SearchPlants from "./components/SearchPlants";
import PlantList from "./components/PlantList";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <PlantList />
        <SearchPlants />
      </header>
    </div>
  );
}

export default App;
