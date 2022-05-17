import './App.css';

import RuteAngkot from './page/RuteAngkot/RuteAngkot';
import PesanUser from './page/PesanUser/PesanUser';
import Login from './page/Login/Login';
import NotFound from './page/NotFound';

import HomeRute from './page/HomeUser/HomeRute';
import Home from './page/admin/HomeAdmin/Home';
import SaranAdmin from './page/admin/Saran/SaranAdmin';
import TambahRute from './page/admin/TambahRute/TambahRute';
import EditRute from './page/admin/EditRute/EditRute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<HomeRute />} />
          <Route path="/rute-angkot" element={<RuteAngkot />} />
          <Route path="/pesan" element={<PesanUser />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={ <PrivateRoute /> }>
            <Route path="/home-admin" element={<Home />} />
            <Route path="/home/tambah-rute" element={<TambahRute />} />
            <Route path="/home/edit-rute/:id" element={<EditRute />} />
            <Route path="/saran-masukkan" element={<SaranAdmin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
