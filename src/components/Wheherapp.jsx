import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = "72de98c6b61d42fbb8380910242610";

  const cityList = [
    "London",
    "Los Angeles",
    "Lagos",
    "Lisbon",
    "Lima",
    "Lahore",
  ];

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: city,
            aqi: "no",
          },
        }
      );
      setWeather(response.data);
      setSuggestions([]);
    } catch (error) {
      alert("City not found!");
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value) {
      const filteredSuggestions = cityList.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather App</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          required
        />
        <button className="btn btn-primary ms-3" onClick={fetchWeather}>
          Search
        </button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-50"
          style={{ marginLeft: "25%" }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: "pointer" }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Display Weather Info */}
      {weather && (
        <div className="card text-center mt-3">
          <div className="card-body">
            <h2 className="card-title">{weather.location.name}</h2>
            <p className="card-text">Temperature: {weather.current.temp_c}°C</p>
            <p className="card-text">Humidity: {weather.current.humidity}%</p>
            <p className="card-text">
              Weather: {weather.current.condition.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
