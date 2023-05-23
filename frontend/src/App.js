import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import Navbar from "./Navbar";
import Favorites from "./Favorites";
import OpeartionsPage from "./OpeartionsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  fetchFirstData,
  fetchMainPageData,
  fetchOpreationsMiniuim,
  fetchOpreationsMaxuim,
  fetchOpreationBetweenPriceRange,
  fetchOpreationNumberOfApartments,
  updateApartmentsDataAPI,
  fetchOpreationGetApartmentByIndex,
} from "./ApiHandler";

export default function App() {
  const [appState, setAppState] = useState({
    apartmentsForMainPage: [],
    submitedRequest: {},
    dataLoaded: false,
    cityAvailable: [],
    apartmentRequestData: [],
    selectedToFavorites: [],
  });
  const handleChangeData = (fieldName, value) => {
    if (
      fieldName === "selectedToFavorites" &&
      appState.selectedToFavorites.length > 0
    ) {
        const filterItems = appState.selectedToFavorites.filter((apartment) => {
          for (const obj of value) {
            if (obj._id === apartment._id) {
              return false; // Exclude the apartment from the filtered array
            }
          }
          return true; // Include the apartment in the filtered array
        });
      if (filterItems.length > 0) {
          const temp = appState.apartmentsForMainPage.map((appartment) => {
            for (const obj of filterItems) {
              if (obj._id === appartment._id) {
                return { ...appartment, selectedToFaviortes: false };
              }
            }
            return appartment;
          });
          setAppState((prevState) => ({
            ...prevState,
            [fieldName]: value,
            apartmentsForMainPage: temp,
          }));
        }
    }
    setAppState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    if (appState.submitedRequest.Request) {
      fetchDataBySubmitedForm({
        appState,
        handleChangeData,
      });
      return;
    }
    fetchDataFirstTime({ handleChangeData });
  }, [appState.submitedRequest]);
  const handleNavbarClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
    }
  };
  const handleSubmit = (formData) => {
    handleChangeData("submitedRequest", formData);
  };

  return (
    <BrowserRouter>
      <Navbar onNavbarClick={handleNavbarClick} />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              apprtmentData={appState.apartmentsForMainPage}
              onSubmit={handleSubmit}
              dataLoaded={appState.dataLoaded}
              citiesAvailable={appState.cityAvailable}
              sendToFavorites={handleChangeData}
            />
          }
        />
        <Route
          path="max"
          element={
            <OpeartionsPage
              citiesAvailable={appState.cityAvailable}
              onSubmit={handleSubmit}
              apartmentData={appState.apartmentRequestData}
            />
          }
        />
        <Route
          path="favorites"
          element={
            <Favorites
              selectedApartments={appState.selectedToFavorites}
              setSelectedToFavorites={handleChangeData}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}


async function fetchDataFirstTime({ handleChangeData }) {
  try {
    handleChangeData("dataLoaded", true);
    const data = await fetchFirstData();
    const unique = uniqueCities(data);
    handleChangeData("cityAvailable",unique );
    handleChangeData("apartmentsForMainPage", data);
  } catch (error) {
    console.error(error);
  } finally {
    handleChangeData("dataLoaded", false);
  }
}


async function fetchDataBySubmitedForm({ appState, handleChangeData }) {
  try {
    handleChangeData("dataLoaded", true);
    switch (appState.submitedRequest.Request) {
      case "table":
        handleChangeData(
          "cityAvailable",
          appState.submitedRequest.citySelected
        );
        const tableData = await fetchMainPageData(appState.submitedRequest);
        const unique = uniqueCities(tableData);
        handleChangeData("cityAvailable",unique );
        handleChangeData("apartmentsForMainPage", tableData);
        break;
      case "minimum":
        const minimumData = await fetchOpreationsMiniuim();
        handleChangeData("apartmentRequestData", minimumData);
        break;
      case "maximum":
        const maxuimData = await fetchOpreationsMaxuim();
        handleChangeData("apartmentRequestData", maxuimData);
        break;
      case "price-between":
        const paramsPriceBetween = {
          minPrice: appState.submitedRequest.minPrice,
          maxPrice: appState.submitedRequest.maxPrice,
        };
        const priceRange = await fetchOpreationBetweenPriceRange(
          paramsPriceBetween
        );
        handleChangeData("apartmentRequestData", priceRange);
        break;
      case "number-of-apartments":
        const paramsNumberOfApartments = {
          numApartments: appState.submitedRequest.numApartments,
        };
        const numberOfApartments = await fetchOpreationNumberOfApartments(
          paramsNumberOfApartments
        );
        handleChangeData("apartmentRequestData", numberOfApartments);
        break;
      case "get-apartments-by-city":
        console.log(appState.submitedRequest.cityWanted);
        const parmasApartmentsByCity = appState.submitedRequest.cityWanted;
        const filterApartmentsByCity = appState.apartmentsForMainPage.filter((apartment)=>{
          if(apartment.adresss ===parmasApartmentsByCity ){
            return true;
          }
          return false;
        });
        handleChangeData("apartmentRequestData",filterApartmentsByCity);
        break;
      case "update-value":
        const valueToUpdate = {
          city: appState.submitedRequest.city,
          price: parseInt(appState.submitedRequest.price),
          size: appState.submitedRequest.size,
          rooms: parseInt(appState.submitedRequest.rooms),
          floor: appState.submitedRequest.floor,
        };
        const newApartments = appState.apartmentsForMainPage.map(
          (appartment) => {
            if (appartment._id === appState.submitedRequest._id) {
              return { ...appartment, ...valueToUpdate };
            }
            return appartment;
          }
        );
        await updateApartmentsDataAPI(
          valueToUpdate,
          appState.submitedRequest._id
        );
        handleChangeData("apartmentsForMainPage", newApartments);
        break;
      default:
        break;
      // handle default case
    }
  } catch (error) {
    console.error(error);
  } finally {
    handleChangeData("dataLoaded", false);
  }
}


function uniqueCities(cities){
  const numberOfCities = cities.map((apartment) => {
    return apartment.adresss;
  });
  const uniqueCities = [...new Set(numberOfCities)];
  return uniqueCities;
}