import React from 'react';

function Favorites({ selectedApartments }) {
  return selectedApartments.length > 0 ? (
    <div>
      <h1>List of Favorites</h1>
      <ul>
        {selectedApartments.map((apartment, index) => (
          <li key={index}>
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

export default Favorites;