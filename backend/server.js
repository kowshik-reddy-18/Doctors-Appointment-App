const express = require('express');
const cors = require('cors');
const doctorsRouter = require('./routes/doctors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/doctors', doctorsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
