import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const badgeClass = {
    'Available Today': 'success',
    'Fully Booked': 'danger',
    'On Leave': 'secondary'
  }[doctor.status] || 'dark';

  return (
    <div className="card h-100">
      <img src={doctor.image} className="card-img-top" alt={doctor.name} />
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>
        <p className="card-text">{doctor.specialization}</p>
        <span className={`badge bg-${badgeClass}`}>{doctor.status}</span>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-primary w-100"
          onClick={() => navigate(`/doctor/${doctor.id}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
