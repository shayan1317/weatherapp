import { useState, useEffect } from "react";
import Weather from "./components/Weather";
import "./app.css";
import api from "./components/api";
import Searchbar from "./components/Searchbar";
function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [location, setLocation] = useState("");
  const [city_weather, setCityWeather] = useState([]);

  useEffect(() => {
    const showData = async (lat, lon) => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
      const full_api_latlon = `${api[0].api_url}?lat=${lat}&lon=${lon}&units=metric&appid=${api[0].api_key}`;

      await fetch(full_api_latlon)
        .then((res) => res.json())
        .then((data) => {
          setCityWeather(data);
          setLocation("");
          console.log(data);
        });
    };
    showData(lat, lon);
  }, [lat, lon]);

  const showData = async (location) => {
    const full_api_byCity = `${api[0].api_url}?q=${location}&&units=metric&appid=${api[0].api_key}`;

    await fetch(full_api_byCity)
      .then((res) => res.json())
      .then((data) => {
        setCityWeather(data);
        setLocation("");
      });
  };
  return (
    <div className="app">
      <Searchbar showData={showData} />
      {city_weather.main != undefined ? (
        <Weather city_weather={city_weather} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default App;
