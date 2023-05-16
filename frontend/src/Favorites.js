import React, { useState, useEffect } from "react";
import "./Favorites.css";

export default function Favorites({
  selectedApartments,
  setSelectedToFavorites,
}) {
  
  const [favoritesState,setFavoritesState]= useState({
    favoriteList :[],
    removeEnabled:false
  });

  useEffect(() => {
    if (selectedApartments) {
      const apartmentsUpdate = selectedApartments.map((apartment) => ({
        ...apartment,
        selected: false
      }));
      setFavoritesState((prevState) => ({
        ...prevState,
        favoriteList: apartmentsUpdate
      }));
    }
  }, [selectedApartments]);

  const handleInputChange = (fieldName,value)=>{
    setFavoritesState((prevState)=>({
      ...prevState,
      [fieldName]:value
    }));
  }

  const handleRemoveFromFavorites = () => {
    const filteredApartments = favoritesState.favoriteList.filter(
      (apartment) => !apartment.selected
    );
    setSelectedToFavorites("selectedToFavorites",filteredApartments);
    setFavoritesState((prevState)=>({
      favoriteList:filteredApartments,
      removeEnabled:!prevState.removeEnabled
    }));
  };

  const handleCheckboxChange = (index) => {
    const updatedApartments = [...favoritesState.favoriteList];
    updatedApartments[index] = {
      ...updatedApartments[index],
      selected: !updatedApartments[index].selected,
    };
    setFavoritesState((prevState)=>({
      ...prevState,
      favoriteList:updatedApartments
    }));
  };
  return favoritesState.favoriteList.length > 0 ? (
    <div className="favorite-container">
      <h1>List of Favorites</h1>
      <button onClick={() => handleInputChange("removeEnabled",!favoritesState.removeEnabled)}>
        {favoritesState.removeEnabled ? "Cancel" : "Remove"}
      </button>
      {favoritesState.removeEnabled && (
        <button onClick={handleRemoveFromFavorites}>Confirm Removal</button>
      )}
      <ul>
        {favoritesState.favoriteList.map((apartment, index) => (
          <li key={index}>
            {favoritesState.removeEnabled && (
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
