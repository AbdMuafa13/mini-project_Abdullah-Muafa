import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-1">
        <div className="container-fluid px-4">
            <span className="navbar-brand logo-app" style={{ fontFamily:"'Poppins', sans-serif"}}>
              CariRute
            </span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3" style={{ fontFamily:"'Poppins', sans-serif"}}>
                    <li>
                        <Link to="/" className="text-success text-decoration-none fw-bold">
                        Home 
                        </Link>
                    </li>
                    <li>
                        <Link to="/rute-angkot" className=" text-success text-decoration-none fw-bold">
                        Rute
                        </Link>
                    </li>
                    <li>
                        <Link to="/pesan" className=" text-success text-decoration-none fw-bold">
                        Pesan
                        </Link>
                    </li>
                    <li>
                        
                    </li>
                </ul>
                <div className="d-flex">
                <button class="btn btn-success" type="submit">
                    <Link to="/login" className=" text-light text-decoration-none fw-bold">
                        Login
                    </Link>
                    </button>
                </div>
            </div>
        </div>
        </nav> */}

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
    </div>
  )
}
