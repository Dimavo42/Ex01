import React, { useState, useEffect } from 'react';


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


