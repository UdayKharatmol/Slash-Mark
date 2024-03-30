const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to fetch weather data
app.post('/weather', async (req, res) => {
  try {
    const { location } = req.body;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY
    OPENWEATHERMAP_API_KEY="454cc965aebf3fce01937c39da3b069d"
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
