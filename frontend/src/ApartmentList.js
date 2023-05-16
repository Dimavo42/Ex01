import React, { useState, useEffect } from "react";
import "./Table.css";
import "./ApartmentList.css";
import { Link } from "react-router-dom";

export default function ApartmentList({
  apartmentsData,
  dataLoaded,
  cityName,
  sendToFavorites,
  onSubmit
}) {
  const[apartmentListProps,setApartmentListProps] = useState({
    apartments:[],
    selectSendFaviortesEnabled:false,
    selectedFaviortes:[],
    editIndex:-1,
  });

  const handleInputChange = (fieldName,value)=>{
    setApartmentListProps((prevState)=>({
      ...prevState,
      [fieldName]:value
    }));
  }

  useEffect(() => {
    const updateApart = apartmentsData.map((apartment)=>({
      ...apartment,
      selectedToFaviortes: false
    }));
    setApartmentListProps((prevState)=>({
      ...prevState,
      apartments:updateApart
    }));
    
  }, [apartmentsData]);

  const handleShowMap = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.location.href = googleMapsUrl;
  };
  const toggleSelectFaviortesEnabled = () => {
    handleInputChange("selectSendFaviortesEnabled",!apartmentListProps.selectSendFaviortesEnabled);
  };
  const handleValueChangeApartment = (index, field, value) => {
    const updatedApartments = [...apartmentListProps.apartments];
    updatedApartments[index][field] = value;
    handleInputChange("apartments",updatedApartments);
  };

  const handleSaveChangedApartment = (index) => {
    const updateApartments = [...apartmentListProps.apartments];
    onSubmit({
      Request:"update-value",
      index: index,
      city:updateApartments[index].city,
      price:updateApartments[index].price,
      size:updateApartments[index].size,
      rooms:updateApartments[index].rooms,
      floor:updateApartments[index].floor,
    });
    handleInputChange("apartments",updateApartments);
    handleInputChange("editIndex",-1);
  }

  const handleSelectApartment = (index) => {
    const updatedApartments = [...apartmentListProps.apartments];
    updatedApartments[index] = {
      ...updatedApartments[index],
      selectedToFaviortes: !updatedApartments[index].selectedToFaviortes,
    };
    handleInputChange("apartments",updatedApartments);
    const currentSelectedApartments = updatedApartments.filter((apartment) => {
      if (apartment.selectedToFaviortes) {
        return apartment;
      }
      return null;
    });
    handleInputChange("selectedFaviortes",currentSelectedApartments);
  };

  const handleGetAllSelectedApartment = () => {
    sendToFavorites("selectedToFavorites",apartmentListProps.selectedFaviortes);
    const updatedApartments = apartmentListProps.apartments.map((apartment) => {
      return {
        ...apartment,
        selectedToFaviortes: false,
      };
    });
    handleInputChange("apartments",updatedApartments);
  };

  if (dataLoaded) {
    return <h1>Loading {cityName}</h1>;
  }

  return (
    <div className="select-container">
      <h1>List of apartments for {cityName}</h1>
      <button
        className="btn-secondary"
        onClick={toggleSelectFaviortesEnabled}
        disabled={apartmentListProps.editIndex !== -1}
      >
        {apartmentListProps.selectSendFaviortesEnabled ? "Disable" : "Enable"} Select Option
      </button>
      {apartmentListProps.selectSendFaviortesEnabled  && (
        <div>
          <button
            className="btn-secondary mr"
            onClick={handleGetAllSelectedApartment}
          >
            Send to favorites
          </button>
          <Link className="link" to="/favorites">
            View Favorites
          </Link>
        </div>
      )}
      {RenderTable(
        apartmentListProps.apartments,
        handleShowMap,
        apartmentListProps.selectSendFaviortesEnabled,
        handleSelectApartment,
        handleInputChange,
        apartmentListProps.editIndex,
        handleValueChangeApartment,
        handleSaveChangedApartment
      )}
    </div>
  );
}

function RenderTable(
  apartments,
  handleShowMap,
  selectEnabled,
  handleSelectApartment,
  setEditIndex,
  editIndex,
  handleValueChangeApartment,
  handleSaveChangedApartment
) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {selectEnabled && <th className="sticky-header">Selected</th>}
            <th className="sticky-header">#</th>
            <th className="sticky-header">City</th>
            <th className="sticky-header">Price</th>
            <th className="sticky-header">Size</th>
            <th className="sticky-header">Rooms</th>
            <th className="sticky-header">Floor</th>
            <th className="sticky-header">ShowOnMap</th>
            <th className="sticky-header">Edit</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment, index) => (
            <tr key={index}>
              {selectEnabled && (
                <td>
                  <input
                    type="checkbox"
                    checked={apartment.selectedToFaviortes}
                    onChange={() => handleSelectApartment(index)}
                  />
                </td>
              )}
              <td>{index + 1}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={apartment.city}
                    onChange={(e) =>
                      handleValueChangeApartment(index, "city", e.target.value)
                    }
                  />
                ) : (
                  apartment.city
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={apartment.price}
                    onChange={(e) =>
                      handleValueChangeApartment(index, "price", e.target.value)
                    }
                  />
                ) : (
                  apartment.price
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={apartment.size}
                    onChange={(e) =>
                      handleValueChangeApartment(index, "size", e.target.value)
                    }
                  />
                ) : (
                  apartment.size
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={apartment.rooms}
                    onChange={(e) =>
                      handleValueChangeApartment(index, "rooms", e.target.value)
                    }
                  />
                ) : (
                  apartment.rooms
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={apartment.floor}
                    onChange={(e) =>
                      handleValueChangeApartment(index, "floor", e.target.value)
                    }
                  />
                ) : (
                  apartment.floor
                )}
              </td>
              <td>
                <button onClick={() => handleShowMap(apartment.city)}>
                  Show on Map
                </button>
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSaveChangedApartment(index) }>
                    Save
                  </button>
                ) : (
                  <button
                    disabled={selectEnabled}
                    onClick={() => setEditIndex("editIndex",index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





