import React, { useState, useEffect } from 'react';
import './Table.css';
import './ApartmentList.css';
import { Link} from 'react-router-dom';

function ApartmentList({apartmentsData,dataLoaded,cityName,SelectedToFavorites}) {
  
  const [apartments,setApartments] = useState([]);
  const [selectEnabled, setSelectEnabled] = useState(false);
  const [selected, setSelected] = useState([]);
  useEffect(()=>{
    setApartments(apartmentsData.map((apartment)=>({...apartment,selected:false})));
  }, [apartmentsData]);

  const handleShowMap = (location) => {
     const encodedLocation = encodeURIComponent(location);
     const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
     window.location.href = googleMapsUrl;
  }
  const toggleSelectEnabled = ()=>{
    setSelectEnabled(!selectEnabled);
  };
  if(dataLoaded)
  {
    return (<h1>Loading {cityName}</h1>);
  }
  const handleSelectApartment = (index)=>{
    const updatedApartments = [...apartments];
    updatedApartments[index] = {
      ...updatedApartments[index],
      selected: !updatedApartments[index].selected
    };
    setApartments(updatedApartments);
    const currentSelectedApartments = updatedApartments.filter((apartment)=>{
      if(apartment.selected)
      {
        return apartment;
      }
    });
    setSelected(currentSelectedApartments);
  };

  const handleGetAllSelectedApartment = ()=>{
    SelectedToFavorites(selected);
  };

  return (
    <div className="select-container">
      <h1>List of apartments for {cityName}</h1>
      <button  className="btn-secondary" onClick={toggleSelectEnabled}>{selectEnabled ? 'Disable' : 'Enable'} Select Option</button>
      {selectEnabled && (
        <div>
          <button  className="btn-secondary mr" onClick={handleGetAllSelectedApartment}>Send to favorites</button>
          <Link className="link"  to="/favorites">View Favorites</Link>
        </div>
      )}
       {RenderTable(apartments,handleShowMap,selectEnabled,handleSelectApartment)}
    </div>
    
  );
}

function RenderTable(apartments,handleShowMap,selectEnabled,handleSelectApartment) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {selectEnabled &&(
              <th className="sticky-header">Selected</th>
            )}
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
              {selectEnabled &&(
                <td>
                <input type="checkbox" checked={apartment.selected} onChange={() => handleSelectApartment(index)} />
              </td>
              )}
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


