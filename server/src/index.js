require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const weatherRoutes = require('./routes/weather');
const errorHandler = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use(morgan('combined'));


app.use('/api/weather', weatherRoutes);

// Health check 
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});