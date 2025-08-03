import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookAppointment() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email, date, time } = formData;
    const datetime = new Date(`${date}T${time}`).toISOString();

    fetch(`http://localhost:5000/api/doctors/${id}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, datetime })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(`${data.error}`);
        } else {
          setMessage('Appointment booked successfully!');
          setFormData({ name: '', email: '', date: '', time: '' });
        }
      })
      .catch(() => setMessage('Something went wrong. Please try again later.'));
  };

  if (!doctor) return <p>Loading doctor info...</p>;

  return (
    <div className="card shadow p-4">
      <h2 className="mb-3">Book Appointment with Dr. {doctor.name}</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input type="text" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" name="date" value={formData.date} className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input type="time" name="time" value={formData.time} className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;
