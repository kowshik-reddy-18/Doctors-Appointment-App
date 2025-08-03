import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';

function LandingPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-3">Available Doctors</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name or specialization"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="row">
        {filtered.map(doc => (
          <div key={doc.id} className="col-md-4 mb-3">
            <DoctorCard doctor={doc} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
