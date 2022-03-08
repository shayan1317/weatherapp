import React from "react";

import "./weather.css";
function Weather({ city_weather }) {
  function refresh() {
    window.location.reload();
  }
  return (
    <div className="ui cards">
      <div className="card main">
        <div className="content">
          <div className="header">
            {city_weather.name == "Allahabad" ? (
              <h1>Islamabad</h1>
            ) : (
              <h1>{city_weather.name}</h1>
            )}
          </div>

          <div className="description">
            <p className="temp">{city_weather.main.temp} C</p>
            <p className="speed">Speed: {city_weather.wind.speed} m/s </p>
            <p className="hum">Humidity: {city_weather.main.humidity} % </p>
          </div>
          <button className="refresh" onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default Weather;
