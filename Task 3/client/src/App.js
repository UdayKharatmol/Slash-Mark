import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.post('/weather', { location });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input type="text" placeholder="Enter location" value={location} onChange={handleLocationChange} />
      <button onClick={fetchWeatherData}>Get Forecast</button>
      {weatherData && (
        <div>
          <h2>Weather Forecast for {weatherData.city.name}</h2>
          <ul>
            {weatherData.list.map((forecast) => (
              <li key={forecast.dt}>{forecast.dt_txt}: {forecast.weather[0].description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
