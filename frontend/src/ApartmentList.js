import React, { useState, useEffect } from 'react';
import './Table.css';

function ApartmentList({apartmentsData,dataLoaded,cityName}) {
  
  const [apartments,setApartments] = useState([]);
  useEffect(()=>{
    setApartments(apartmentsData);
  }, [apartmentsData]);

  const handleShowMap = (location) => {
     const encodedLocation = encodeURIComponent(location);
     const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
     window.location.href = googleMapsUrl;
  }
  if(dataLoaded)
  {
    return (<h1>Loading {cityName}</h1>);
  }

  return (
    <div>
      <h1>List of apartments for {cityName}</h1>
      {RenderTable(apartments,handleShowMap)}
    </div>
  );
}

function RenderTable(apartments,handleShowMap) {

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="sticky-header">#</th>
            <th className="sticky-header">City</th>
            <th className="sticky-header">Price</th>
            <th className="sticky-header">Size</th>
            <th className="sticky-header">Rooms</th>
            <th className="sticky-header">Floor</th>
            <th className="sticky-header">ShowOnMap</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{apartment.city}</td>
              <td>{apartment.price}</td>
              <td>{apartment.size}</td>
              <td>{apartment.rooms}</td>
              <td>{apartment.floor}</td>
              <td>
                <button onClick={() => handleShowMap(apartment.city)}>Show on Map</button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




export default ApartmentList;


