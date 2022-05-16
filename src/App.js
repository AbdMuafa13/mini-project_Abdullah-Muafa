import './App.css';

import RuteAngkot from './page/RuteAngkot';
import PesanUser from './page/PesanUser';
import Login from './page/Login';
import NotFound from './page/NotFound';
import PrivateRoute from "./components/PrivateRoute";
import HomeRute from './page/HomeRute';
import Home from './page/admin/Home';
import SaranAdmin from './page/admin/Saran/SaranAdmin';
import TambahRute from './page/admin/Rute/TambahRute';
import EditRute from './page/admin/Rute/EditRute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<HomeRute />} />
          <Route path="/rute-angkot" element={<RuteAngkot />} />
          <Route path="/pesan" element={<PesanUser />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tambah-rute" element={<TambahRute />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={ <PrivateRoute /> }>
          <Route path="/edit-rute" element={<EditRute />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/saran-masukkan" element={<SaranAdmin />} />
            {/* <Route path="/tambah-rute" element={<TambahRute />} />
            <Route path="/saran-masukkan" element={<SaranAdmin />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
