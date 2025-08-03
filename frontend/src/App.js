import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import AllAppointments from './pages/AllAppointments';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm px-3">
        <Link className="navbar-brand fw-bold" to="/">NirogGyan</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Doctors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/appointments">Admin</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<BookAppointment />} />
        <Route path="/admin/appointments" element={<AllAppointments />} />
      </Routes>
    </div>
  );
}



export default App;

