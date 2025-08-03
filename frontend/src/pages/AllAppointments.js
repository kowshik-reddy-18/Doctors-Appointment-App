import React, { useEffect, useState } from 'react';

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors/appointments/all')
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Doctor ID</th>
                <th>Patient Name</th>
                <th>Email</th>
                <th>Appointment Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td>{appt.doctorId}</td>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{new Date(appt.datetime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllAppointments;
