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
  const [apartments, setApartments] = useState([]);
  const [selectSendFaviortesEnabled, setSendFaviortesEnabled] = useState(false);
  const [selectedFaviortes, setSelectedFaviortes] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    setApartments(
      apartmentsData.map((apartment) => ({
        ...apartment,
        selectedToFaviortes: false,
      }))
    );
  }, [apartmentsData]);

  const handleShowMap = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.location.href = googleMapsUrl;
  };
  const toggleSelectFaviortesEnabled = () => {
    setSendFaviortesEnabled(!selectSendFaviortesEnabled);
  };
  const handleValueChangeApartment = (index, field, value) => {
    const updatedApartments = [...apartments];
    updatedApartments[index][field] = value;
    setApartments(updatedApartments);
  };

  const handleSaveChangedApartment = (index) => {
    const updateApartments = [...apartments];
    onSubmit({
      Request:"update-value",
      index: index,
      city:updateApartments[index].city,
      price:updateApartments[index].price,
      size:updateApartments[index].size,
      rooms:updateApartments[index].rooms,
      floor:updateApartments[index].floor,
    });
    setEditIndex(-1);
  }

  

  const handleSelectApartment = (index) => {
    const updatedApartments = [...apartments];
    updatedApartments[index] = {
      ...updatedApartments[index],
      selectedToFaviortes: !updatedApartments[index].selectedToFaviortes,
    };
    setApartments(updatedApartments);
    const currentSelectedApartments = updatedApartments.filter((apartment) => {
      if (apartment.selectedToFaviortes) {
        return apartment;
      }
      return null;
    });
    setSelectedFaviortes(currentSelectedApartments);
  };

  const handleGetAllSelectedApartment = () => {
    sendToFavorites(selectedFaviortes);
    const updatedApartments = apartments.map((apartment) => {
      return {
        ...apartment,
        selected: false,
      };
    });
    setApartments(updatedApartments);
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
        disabled={editIndex !== -1}
      >
        {selectSendFaviortesEnabled ? "Disable" : "Enable"} Select Option
      </button>
      {selectSendFaviortesEnabled && (
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
        apartments,
        handleShowMap,
        selectSendFaviortesEnabled,
        handleSelectApartment,
        setEditIndex,
        editIndex,
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
                    onClick={() => setEditIndex(index)}
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





