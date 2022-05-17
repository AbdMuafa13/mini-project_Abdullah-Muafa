import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top customNav">
          <div className="container-fluid">
            <Link className="navbar-brand navBrand" to="/">
              CariRute
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto me-4">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/rute-angkot"
                  >
                    Rute
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/pesan"
                  >
                    Saran
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item ">
                  <button class="btn btn-success" type="submit">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link-button active text-decoration-none" : "nav-link-button text-decoration-none"
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                    </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
