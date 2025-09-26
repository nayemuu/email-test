import React from "react";
import "./Hamburger.css";

function Hamburger({ callback, show }) {
  const toggleMenu = () => {
    callback();
  };

  return (
    <div className="mt-[3px] relative lg:hidden">
      <button
        id="menu-btn"
        type="button"
        className={`block hamburger focus:outline-none ${show ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="hamburger-top" />
        <span className="hamburger-middle" />
        <span className="hamburger-bottom" />
      </button>
    </div>
  );
}

export default Hamburger;
