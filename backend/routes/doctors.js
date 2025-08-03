const express = require('express');
const router = express.Router();
const doctors = require('../data/doctors.json');
const fs = require('fs');
const path = require('path');

const appointmentsFile = path.join(__dirname, '../data/appointments.json');

router.get('/', (req, res) => {
  res.json(doctors);
});

router.get('/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === req.params.id);
  if (doctor) res.json(doctor);
  else res.status(404).json({ error: 'Doctor not found' });
});

router.get('/appointments/all', (req, res) => {
  if (!fs.existsSync(appointmentsFile)) {
    return res.json([]);
  }
  const data = JSON.parse(fs.readFileSync(appointmentsFile));
  res.json(data);
});

router.post('/:id/appointments', (req, res) => {
  console.log("Incoming POST /appointments request:");
  console.log("Body:", req.body);

  const doctorId = req.params.id;
  const { name, email, datetime } = req.body;

  if (!name || !email || !datetime) {
    console.log("Validation failed.");
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const appointment = {
    id: Date.now().toString(),
    doctorId,
    name,
    email,
    datetime
  };

  let appointments = [];
  try {
    if (fs.existsSync(appointmentsFile)) {
      appointments = JSON.parse(fs.readFileSync(appointmentsFile));
    }

    appointments.push(appointment);
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));

    console.log("Appointment saved:", appointment);
    res.status(201).json({ message: 'Appointment booked!', appointment });
  } catch (err) {
    console.error("Error writing file:", err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});


module.exports = router;
