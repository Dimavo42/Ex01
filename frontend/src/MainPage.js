import React, { useState } from "react";
import ApartmentList from "./ApartmentList";
import "./MainPage.css";

function validateInput(minimumPrice, maximumPrice, minimumRoom, maximumRoom) {
  if (maximumPrice < minimumPrice || maximumRoom < minimumRoom) {
    throw new Error("Invalid input");
  }
}

export default function MainPage({
  apprtmentData,
  onSubmit,
  dataLoaded,
  cityName,
  sendToFavorites,
}) {


  const [requestNewTable,setRequestNewTable] = useState({
    citySelected:"TelAviv",
    minimumRoom:2,
    maximumRoom:5,
    minimumPrice:1000000,
    maximumPrice:2500000,
    numberPages:3
  });

  const handleInputeChange = (fieldName,value)=>{
    setRequestNewTable((prevState)=>({
      ...prevState,
      [fieldName]:value
    }));
  };

  const handleSubmited = (event) => {
    event.preventDefault();
    try {
      if (dataLoaded) {
        alert("Data is loading wait until response ");
        return;
      }
      validateInput(requestNewTable.minimumPrice, requestNewTable.maximumPrice, requestNewTable.minimumRoom, requestNewTable.maximumRoom);
      onSubmit({
        Request: "table",
        ...requestNewTable
      });
    } catch (error) {
      alert("Invalid input");
    }
  };
  return (
    <div className="main-form">
      <h1>Search for differnet appertments</h1>
      <form onSubmit={handleSubmited}>
        <SelectCity
          currentOperation={requestNewTable.citySelected}
          setCurrentOperation={handleInputeChange}
        />
        <SelecteRoomSize
          minimumRoom={requestNewTable.minimumRoom}
          maximumRoom={requestNewTable.maximumRoom}
          setInputChange={handleInputeChange}

        />
        <SelectePriceRange
          minimumPrice={requestNewTable.minimumPrice}
          maximumPrice={requestNewTable.maximumPrice}
          setInputChange={handleInputeChange}
        />
        <SelecteNumberOfPages
          numberPages={requestNewTable.numberPages}
          setInputChange={handleInputeChange}
        />
        <input type="submit" value="Search"></input>
      </form>
      <ApartmentList
        apartmentsData={apprtmentData}
        dataLoaded={dataLoaded}
        cityName={cityName}
        sendToFavorites={sendToFavorites}
        onSubmit={onSubmit}
      />
    </div>
  );
}

function SelectCity({ currentOperation, setCurrentOperation }) {
  return (
    <div className="select-city">
      <label htmlFor="select-city">Chooese City</label>
      <select
        value={currentOperation}
        onChange={(event) => setCurrentOperation("citySelected",event.target.value)}
      >
        <option value="TelAviv">TelAviv</option>
        <option value="RishonLezion">Rishon-Lezion</option>
        <option value="Jerusalem">Jerusalem</option>
        <option value="Haifa">Haifa</option>
      </select>
    </div>
  );
}

function SelecteRoomSize({
  minimumRoom,
  maximumRoom,
  setInputChange
}) {
  return (
    <div className="select-room-size">
      <label htmlFor="select-room-size">minimum rooms</label>
      <input
        id="minimum-rooms-input"
        type="number"
        value={minimumRoom}
        onChange={(event) => setInputChange("minimumRoom",parseInt(event.target.value))}
      ></input>
      <label htmlFor="select-room-size">maxiumum rooms</label>
      <input
        id="maximum-rooms-input"
        type="number"
        value={maximumRoom}
        onChange={(event) => setInputChange("maximumRoom",parseInt(event.target.value))}
      ></input>
    </div>
  );
}

function SelectePriceRange({
  minimumPrice,
  maximumPrice,
  setInputChange,
}) {
  return (
    <div className="selecte-price-range">
      <label htmlFor="selecte-price-range">minimum price</label>
      <input
        id="minimum-price-input"
        type="number"
        value={minimumPrice}
        onChange={(event) => setInputChange("minimumPrice",parseInt(event.target.value))}
      ></input>
      <label htmlFor="selecte-price-range">maxiumum price</label>
      <input
        id="maximum-price-input"
        type="number"
        value={maximumPrice}
        onChange={(event) => setInputChange("maximumPrice",parseInt(event.target.value))}
      ></input>
    </div>
  );
}

function SelecteNumberOfPages({ numberPages, setInputChange }) {
  return (
    <div className="select-number-pages">
      <label htmlFor="selecte-number-pages">selecte-number-pages</label>
      <input
        id="number-of-pages"
        type="number"
        value={numberPages}
        onChange={(event) => setInputChange("numberPages",parseInt(event.target.value))}
      ></input>
    </div>
  );
}