import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand" style={{ color: "#333", fontWeight: "bold", fontSize: "1.5rem" }}>
          PasteApp
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <NavLink to="/" className="nav-link" activeClassName="active-link" style={{ color: "#4CAF50", fontWeight: "500" }}>
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink to="/pastes" className="nav-link" activeClassName="active-link" style={{ color: "#4CAF50", fontWeight: "500" }}>
                Pastes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
