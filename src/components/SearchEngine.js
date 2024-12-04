import React, { useState } from "react";

function SearchEngine({ query, setQuery }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value);
  };

  return (
    <form className="SearchEngine" onSubmit={handleSubmit}>
      <input
        type="text"
        className="city-search"
        placeholder="Enter city name"
        name="city"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </form>
  );
}

export default SearchEngine;
