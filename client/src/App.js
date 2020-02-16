import React, { useState, useEffect } from "react";

// Import components
import SearchPlants from "./components/SearchPlants";
import PlantList from "./components/PlantList";
import Login from "./components/Login";
import PlantForm from "./components/PlantForm";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

import plantService from "./services/plants";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [plants, setPlants] = useState([]);
  const [plantForm, setPlantForm] = useState(0);
  const [confMessage, setConfMessage] = useState("");

  // Check if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPlantUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      plantService.setToken(user.token);
    }
  }, []);

  // Get all plants
  useEffect(() => {
    plantService.getAll().then(plants => {
      setPlants(plants.data);
      console.log(plants);
    });
  }, [plants]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedPlantUser");
    setUser(null);
  };
  //       <div className={plantForm === 1 ? "overlay" : ""}></div>

  // Render login in if there is no user
  if (user === null)
    return (
      <div className="login">
        <Notification
          confMessage={confMessage}
          setConfMessage={setConfMessage}
        />
        <div className="login-form">
          <div className="login-header">
            <h1>Plant City</h1>
          </div>

          <div className="login-body">
            <Login setUser={setUser} setConfMessage={setConfMessage} />
          </div>
        </div>
      </div>
    );

  // Render app
  return (
    <div className="plant-app">
      <Notification confMessage={confMessage} setConfMessage={setConfMessage} />
      <PlantForm
        plantForm={plantForm}
        setPlantForm={setPlantForm}
        setPlants={setPlants}
        setConfMessage={setConfMessage}
      />
      <header className="plant-app-header">
        <h1>Plant City</h1>
        <div className="logout">
          {`${user.name}`}
          <button className="fa fa-sign-out" onClick={handleLogout}></button>
        </div>
        <Navbar />
      </header>
      <section className="app-body">
        <SearchPlants />
        <section className="app-body-main">
          <PlantList
            plants={plants}
            setPlants={setPlants}
            setPlantForm={setPlantForm}
            setConfMessage={setConfMessage}
          />
        </section>
      </section>
    </div>
  );
}

export default App;
