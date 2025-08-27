import "./weather.css";

const WeatherIcon = ({ condition, size = 64 }) => {
  const icons = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "shower rain": "🌦️",
    rain: "🌧️",
    thunderstorm: "⛈️",
    snow: "🌨️",
    mist: "🌫️",
    haze: "🌫️",
    fog: "🌫️",
    default: "🌤️",
  };

  return (
    <span style={{ fontSize: `${size}px` }}>
      {icons[condition?.toLowerCase()] || icons.default}
    </span>
  );
};
const Weather = ({ city_weather }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <h1 className="city-name">{city_weather.name}</h1>
          <p className="country">{city_weather.sys?.country}</p>
        </div>
        <div className="weather-icon-large">
          <WeatherIcon
            condition={city_weather.weather?.[0]?.description}
            size={80}
          />
        </div>
      </div>

      <div className="main-weather">
        <div className="temperature">
          <span className="temp-value">
            {Math.round(city_weather.main?.temp)}°
          </span>
          <span className="temp-unit">C</span>
        </div>
        <div className="weather-description">
          <p className="condition">{city_weather.weather?.[0]?.main}</p>
          <p className="description">
            {city_weather.weather?.[0]?.description}
          </p>
        </div>
      </div>

      <div className="feels-like">
        Feels like {Math.round(city_weather.main?.feels_like)}°C
      </div>

      <div className="weather-details">
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">
                {city_weather.main?.humidity}%
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17.5 19H9A7 7 0 1 1 6.71 6.36C6.21 4.95 7.13 3.5 8.5 3.5C10.36 3.5 12 5.14 12 7V8A5 5 0 0 1 17.5 13V19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">
                {city_weather.wind?.speed} m/s
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.828 14.828A4 4 0 0 1 9.172 9.172M14.828 14.828L20 20M14.828 14.828L9.172 9.172M9.172 9.172L4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">
                {city_weather.main?.pressure} hPa
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.02L12 19L6.82 22.02L8 14.74L2 9L9.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">
                {(city_weather.visibility / 1000).toFixed(1)} km
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-time">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff9500">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <path
              d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Sunrise: {formatTime(city_weather.sys?.sunrise)}</span>
        </div>
        <div className="sun-time">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff6b35">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <path
              d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Sunset: {formatTime(city_weather.sys?.sunset)}</span>
        </div>
      </div>
    </div>
  );
};
export default Weather;
