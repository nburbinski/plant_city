import React, { useState, useEffect } from "react";

// Import components
import SearchPlants from "./components/SearchPlants";
import PlantList from "./components/PlantList";
import Login from "./components/Login";
import PlantForm from "./components/PlantForm";
import Navbar from "./components/Navbar";

import plantService from "./services/plants";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [plants, setPlants] = useState([]);
  const [plantForm, setPlantForm] = useState(0);

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
  }, [plants]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedPlantUser");
    setUser(null);
  };

  if (user === null)
    return (
      <div className="Login">
        <div className="login-header">
          <h1>Plant City</h1>
        </div>

        <div className="login-body">
          <Login setUser={setUser} />
        </div>
      </div>
    );

  return (
    <div className="App">
      <div className={plantForm === 1 ? "overlay" : ""}></div>
      <PlantForm
        plantForm={plantForm}
        setPlantForm={setPlantForm}
        setPlants={setPlants}
      />
      <section>
        <header className="App-header">
          <h1>Plant City</h1>
          <div className="logout">
            {`${user.name} is logged in `}{" "}
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Navbar />
        </header>
      </section>
      <section className="App-body">
        <SearchPlants />
        <button className="btn btn-addplant" onClick={() => setPlantForm(1)}>
          Add a plant!
        </button>
        <section className="App-body-main">
          <PlantList plants={plants} setPlants={setPlants} />
        </section>
      </section>
    </div>
  );
}

export default App;
