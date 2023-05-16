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
  fetchOpreationGetApartmentByIndex
} from "./ApiHandler";

export default function App() {
  const [appState,setAppState] = useState({
    apartmentsForMainPage:[],
    submitedRequest:{},
    dataLoaded:false,
    cityName:"",
    apartmentRequestData:[],
    selectedToFavorites:[]
  });
  const handleChangeData = (fieldName,value)=>{
    setAppState((prevState)=>({
      ...prevState,
      [fieldName]:value
    }));
  };
  useEffect(() => {
    if (appState.submitedRequest.Request) {
      fetchDataBySubmitedForm({
        appState,
        handleChangeData
      });
      return;
    }
    fetchDataFirstTime({
      handleChangeData
    });
  }, [appState.submitedRequest]);
  const handleNavbarClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
    }
  };
  const handleSubmit = (formData) => {
    handleChangeData("submitedRequest",formData);
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
              cityName={appState.cityName}
              sendToFavorites={handleChangeData}
            />
          }
        />
        <Route
          path="max"
          element={
            <OpeartionsPage
              cityName={appState.cityName}
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

async function fetchDataFirstTime({
  handleChangeData
  
}) {
  try {
    handleChangeData("dataLoaded",true);
    const data = await fetchFirstData();
    handleChangeData("cityName","TelAviv");
    handleChangeData("apartmentsForMainPage",data);
  } catch (error) {
    console.error(error);
  } finally {
    handleChangeData("dataLoaded",false);
  }
}

async function fetchDataBySubmitedForm({
  appState,
  handleChangeData
}) {
  try {
    handleChangeData("dataLoaded",true);
    switch (appState.submitedRequest.Request) {
      case "table":
        handleChangeData("cityName",appState.submitedRequest.citySelected);
        const tableData = await fetchMainPageData(appState.submitedRequest);
        handleChangeData("apartmentsForMainPage",tableData);
        break;
      case "minimum":
        const minimumData = await fetchOpreationsMiniuim();
        handleChangeData("apartmentRequestData",minimumData);
        break;
      case "maximum":
        const maxuimData = await fetchOpreationsMaxuim();
        handleChangeData("apartmentRequestData",maxuimData);
        break;
      case "price-between":
        const paramsPriceBetween = {
          minPrice: appState.submitedRequest.minPrice,
          maxPrice: appState.submitedRequest.maxPrice,
        };
        const priceRange = await fetchOpreationBetweenPriceRange(
          paramsPriceBetween
        );
        handleChangeData("apartmentRequestData",priceRange);
        break;
      case "number-of-apartments":
        const paramsNumberOfApartments = {
          numApartments: appState.submitedRequest.numApartments,
        };
        const numberOfApartments = await fetchOpreationNumberOfApartments(
          paramsNumberOfApartments
        );
        handleChangeData("apartmentRequestData",numberOfApartments);
        break;
      case "get-apartment-index":
        const parmasApartmentsByIndex = appState.submitedRequest.numApartments;
        const  apartmentByIndex = await fetchOpreationGetApartmentByIndex(parmasApartmentsByIndex);
        handleChangeData("apartmentRequestData",apartmentByIndex);
        handleChangeData("dataLoaded",false);
        break;
      case "update-value":
        const valueToUpdate = {
          city:appState.submitedRequest.city,
          price:parseInt(appState.submitedRequest.price),
          size:appState.submitedRequest.size,
          rooms:parseInt(appState.submitedRequest.rooms),
          floor:appState.submitedRequest.floor
        }
        const newApartments = [...appState.apartmentsForMainPage];
        newApartments[appState.submitedRequest.index] = {
          ...newApartments[appState.submitedRequest.index],
          ...valueToUpdate
        };
        await updateApartmentsDataAPI(valueToUpdate,appState.submitedRequest.index);
        handleChangeData("apartmentsForMainPage",newApartments)
          break;
      default:
        break;
      // handle default case
    }
  } catch (error) {
    console.error(error);
  } finally {
    handleChangeData("dataLoaded",false);
  }
}
