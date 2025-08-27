import { useState, useEffect } from "react";
import api from "../src/components/api";
import Weather from "./components/Weather";
import Searchbar from "./components/Searchbar";
import "./app.css";

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [city_weather, setCityWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Get user location on app load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setLocationEnabled(true);
        },
        (error) => {
          console.log("Location access denied");
          setError("Location access denied. Please search for a city.");
        }
      );
    }
  }, []);

  // Fetch weather by coordinates

  const fetchWeatherByCoords = async (latitude, longitude) => {
    setIsLoading(true);
    setError("");

    try {
      const full_api_latlon = `${api[0].api_url}?lat=${latitude}&lon=${longitude}&units=metric&appid=${api[0].api_key}`;

      const response = await fetch(full_api_latlon);
      if (!response.ok) {
        throw new Error("Weather data not available");
      }

      const data = await response.json();
      console.log("full_api_latlon", data);
      setCityWeather(data);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = async (location) => {
    setIsLoading(true);
    setError("");

    try {
      const full_api_byCity = `${api[0].api_url}?q=${location}&units=metric&appid=${api[0].api_key}`;

      const response = await fetch(full_api_byCity);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setCityWeather(data);
    } catch (err) {
      setError("City not found. Please check the spelling and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position", position);
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setIsLoading(false);
        },
        (error) => {
          setError("Unable to get current location");
          setIsLoading(false);
        }
      );
    }
  };
  useEffect(() => {
    if (lat && lon) {
      fetchWeatherByCoords(lat, lon);
    }
  }, [lat, lon]);
  return (
    <div className="app">
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">
            <span className="title-icon">🌤️</span>
            Weather App
          </h1>
          <button
            onClick={getCurrentLocation}
            className="location-btn"
            disabled={isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Current Location
          </button>
        </div>

        <Searchbar showData={fetchWeatherByCity} isLoading={isLoading} />

        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="15"
                y1="9"
                x2="9"
                y2="15"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="9"
                y1="9"
                x2="15"
                y2="15"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            {error}
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {city_weather.main && !isLoading && (
          <Weather city_weather={city_weather} />
        )}

        {!city_weather.main && !isLoading && !error && (
          <div className="welcome-message">
            <div className="welcome-icon">🌍</div>
            <h2>Welcome to Weather App</h2>
            <p>
              Search for a city or allow location access to see current weather
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
