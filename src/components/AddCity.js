import React from "react";

const AddCity = () => {
  return (
    <div className="add-city-input-box">
      <input
        className="add-city-input"
        type="text"
        placeholder="Enter a city"
      />
      <button className="add-city-btn" type="submit">
        {" "}
        Add City
      </button>
    </div>
  );
};

export default AddCity;
