import React from "react";
const Navbar = () => {
  return (
    <nav className="main-nav">
      <button className="btn">Home</button>

      <button className="btn">About</button>

      <button
        onClick={() =>
          window.open("https://github.com/nburbinski/plant_city", "github repo")
        }
        className="btn"
      >
        GitHub
      </button>
    </nav>
  );
};

export default Navbar;
