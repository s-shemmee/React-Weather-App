import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("Rabat");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.data;
            const city = data.address.city || data.address.town || data.address.village;
            setQuery(city);
          } catch (err) {
            console.error("Failed to fetch city data:", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="App">
      <SearchEngine query={query} setQuery={setQuery} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>Sorry city not found, please try again.</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default App;
