import { useState } from 'react';
import './App.css';
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError('');
      // CRITICAL: We are calling OUR backend, not the OpenWeather API directly.
      const response = await fetch(`${API_URL}/weather?city=${city}`);
      
      if (!response.ok) {
        throw new Error('City not found or server error');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter a city (e.g., Ludhiana, Tokyo)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>
          <p className="description">{weather.weather[0].description}</p>
          
          <div className="details">
            <p>Humidity: <strong>{weather.main.humidity}%</strong></p>
            <p>Wind: <strong>{weather.wind.speed} m/s</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;