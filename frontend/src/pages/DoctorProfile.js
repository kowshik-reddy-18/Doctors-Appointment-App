import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`)
      .then(res => res.json())
      .then(data => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctor:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading doctor details...</p>;
  if (!doctor || doctor.error) return <p>Doctor not found.</p>;

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <img src={doctor.image} className="card-img-top" alt={doctor.name} />
      <div className="card-body">
        <h3 className="card-title">{doctor.name}</h3>
        <p className="card-text">{doctor.specialization}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`badge bg-${doctor.status === 'Available Today' ? 'success' : doctor.status === 'On Leave' ? 'secondary' : 'danger'}`}>
            {doctor.status}
          </span>
        </p>
        <h5 className="mt-3">Available Slots:</h5>
        {doctor.availability.length > 0 ? (
          <ul className="list-group mb-3">
            {doctor.availability.map((slot, index) => (
              <li key={index} className="list-group-item">
                {slot}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No available slots.</p>
        )}

        <button
          className="btn btn-primary w-100"
          onClick={() => navigate(`/book/${doctor.id}`)}
          disabled={doctor.availability.length === 0}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorProfile;
