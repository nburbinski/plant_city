import React, { useState, useEffect } from "react";

import SearchPlants from "./components/SearchPlants";
import PlantList from "./components/PlantList";
import Login from "./components/Login";
import PlantForm from "./components/PlantForm";

import plantService from "./services/plants";

function App() {
  const [user, setUser] = useState(null);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPlantUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      plantService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    plantService.getAll().then(plants => {
      setPlants(plants.data);
    });
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedPlantUser");
    setUser(null);
  };

  if (user === null)
    return (
      <div className="App">
        <h1 className="text-center">Plant City BBY</h1>

        <header className="App-header">
          <Login setUser={setUser} />
        </header>
      </div>
    );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center">Plant City BBY</h1>
      </header>
      <div className="container">
        <div className="nav nav-tabs navbar-right">
          {`${user.name} is logged in `}{" "}
          <button
            className="btn btn-danger ml-2 mb-2"
            variant="danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <SearchPlants />
        <PlantForm />
        <PlantList plants={plants} />
      </div>
    </div>
  );
}

export default App;
