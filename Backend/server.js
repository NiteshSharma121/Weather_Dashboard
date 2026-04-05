require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
// Enable CORS so our React frontend can communicate with this backend
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// The Proxy Route
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // We make the request to OpenWeather from the SERVER, hiding the API key from the browser
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    
    // Send the weather data back to the React frontend
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data. Check city name.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
