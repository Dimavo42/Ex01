import React, { useState } from "react";
import "./Favorites.css";

export default function Favorites({
  selectedApartments,
  setSelectedToFavorites,
}) {
  const [removeEnabled, setRemoveEnabled] = useState(false);

  const handleRemoveFromFavorites = () => {
    const filteredApartments = selectedApartments.filter(
      (apartment) => apartment.selected
    );
    setSelectedToFavorites(filteredApartments);
    setRemoveEnabled(!removeEnabled);
  };

  const handleCheckboxChange = (index) => {
    const updatedApartments = [...selectedApartments];
    updatedApartments[index] = {
      ...updatedApartments[index],
      selected: !updatedApartments[index].selected,
    };
    setSelectedToFavorites(updatedApartments);
  };
  return selectedApartments.length > 0 ? (
    <div className="favorite-container">
      <h1>List of Favorites</h1>
      <button onClick={() => setRemoveEnabled(!removeEnabled)}>
        {removeEnabled ? "Cancel" : "Remove"}
      </button>
      {removeEnabled && (
        <button onClick={handleRemoveFromFavorites}>Confirm Removal</button>
      )}
      <ul>
        {selectedApartments.map((apartment, index) => (
          <li key={index}>
            {removeEnabled && (
              <input
                type="checkbox"
                checked={apartment.selected}
                onChange={() => handleCheckboxChange(index)}
              />
            )}
            <h2>{apartment.city}</h2>
            <p>Price: {apartment.price}</p>
            <p>Size: {apartment.size}</p>
            <p>Rooms: {apartment.rooms}</p>
            <p>Floor: {apartment.floor}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Select favorites before coming here</h1>
  );
}


