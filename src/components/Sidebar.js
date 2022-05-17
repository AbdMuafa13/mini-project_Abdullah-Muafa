import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <header>
      <nav className="navbar bg-white shadow-sm">
        <div className="container">
          <div className="row align-items-center ">
            <i className="col-1 bi bi-list mb-2 " onClick={handleClick}></i>
            <span className="col-1 navbar-brand h1 logo-app">
              CariRute
            </span>
          </div>
          <div className="mt-2">
            <ul className="list-unstyled d-flex gap-3">
              <li>
                <button class="btn btn-success" type="submit">
                <i className="col-1 bi bi-box-arrow-right mb-2 me-1"></i>
                  <Link to="/" className=" text-light text-decoration-none fw-bold">
                    Log Out
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {menu && (
        <div className="menu fixed-top bg-success">
          <div className="container">
            <div className="row">
              <div className="col-12 text-end mt-3">
                <i className="bi bi-x-lg" onClick={handleClick}></i>
              </div>
              <div className="col-12">
                <h1 className="navbar-brand mb-0 logo-app text-white" style={{ fontFamily: "'Nunito-Sans', sans-serif;" }}>
                  CariRute
                </h1>
              </div>
              <div className="menu-lists pt-4">
                <ul className="list-unstyled d-flex flex-column gap-3">
                  <li>
                    <Link to="/home-admin" className="text-white text-decoration-none fw-bold">
                    <i class="bi bi-house-door me-1"></i>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/home/tambah-rute" className="text-white text-decoration-none fw-bold">
                    <i class="bi bi-cursor me-1"></i>
                      Tambah Rute
                    </Link>
                  </li>
                  <li>
                    <Link to="/saran-masukkan" className=" text-white text-decoration-none fw-bold">
                    <i class="bi bi-journals me-1"></i>
                      Saran
                    </Link>
                  </li>
                  <li>
                  <button class="btn btn-light" type="submit">
                    <i className="col-1 bi bi-box-arrow-right mb-2 me-1"></i>
                      <Link to="/" className=" text-success text-decoration-none fw-bold">
                        Log Out
                      </Link>
                  </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Sidebar;
