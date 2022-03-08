import React from "react";
import { useState } from "react";

function Searchbar({ showData }) {
  const [cityName, setName] = useState("");

  function searchCity(e) {
    e.preventDefault();
    showData(cityName);
    setName("");
  }
  return (
    <div className="ui category search">
      <form className="ui icon input" onSubmit={searchCity}>
        <input
          className="prompt"
          type="text"
          placeholder="Search city..."
          value={cityName}
          onChange={(e) => setName(e.target.value)}
        />
        <i className="search icon"></i>
      </form>
    </div>
  );
}

export default Searchbar;
