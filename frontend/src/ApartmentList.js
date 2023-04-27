import React, { useState, useEffect } from 'react';


function ApartmentList({setApartmentsAPI}) {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/item/')
      .then(response => response.json())
      .then((data) => {
        setApartments(Object.values(data.item));
        setApartmentsAPI(Object.values(data.item))
      }).catch((err)=> console.log(err));
  }, []);

  const handleShowMap = (location) => {
     const encodedLocation = encodeURIComponent(location);
     const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
     window.location.href = googleMapsUrl;
  }

  return (
    <div>
      <h1>List of Apartments</h1>
      {apartments.length > 0 && RenderTable(apartments,handleShowMap)}
    </div>
  );
}

function RenderTable(apartments,handleShowMap) {
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };
  const thStyle = {
    backgroundColor: '#ddd',
    fontWeight: 'bold',
    padding: '8px',
    textAlign: 'left',
  };
  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>#</th>
          <th style={thStyle}>City</th>
          <th style={thStyle}>Price</th>
          <th style={thStyle}>Size</th>
          <th style={thStyle}>Rooms</th>
          <th style={thStyle}>Floor</th>
          <th style={thStyle}>ShowOnMap</th>
        </tr>
      </thead>
      <tbody>
        {apartments.map((apartment, index) => (
          <tr key={index}>
            <td style={tdStyle}>{index + 1}</td>
            <td style={tdStyle}>{apartment.city}</td>
            <td style={tdStyle}>{apartment.price}</td>
            <td style={tdStyle}>{apartment.size}</td>
            <td style={tdStyle}>{apartment.rooms}</td>
            <td style={tdStyle}>{apartment.floor}</td>
            <td style={tdStyle}>
              <button onClick={()=>handleShowMap(apartment.city)}>Show on Map</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}




export default ApartmentList;


