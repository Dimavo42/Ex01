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
  updateApartmentsDataAPI
} from "./ApiHandler";

export default function App() {
  const [apartmentsForMainPage, setApartmentsForMainPage] = useState([]);
  const [submitedRequest, setSubmitedRequest] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cityName, setCityName] = useState("");
  const [apartmentRequestData, setApartmentRequestData] = useState([]);
  const [selectedToFavorites, setSelectedToFavorites] = useState([]);
  useEffect(() => {
    if (submitedRequest.Request) {
      fetchDataBySubmitedForm({
        setDataLoaded,
        setApartmentsForMainPage,
        setApartmentRequestData,
        submitedRequest,
        setCityName,
      });
      return;
    }
    fetchDataFirstTime({
      setDataLoaded,
      setCityName,
      setApartmentsForMainPage,
    });
  }, [submitedRequest]);
  const handleNavbarClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
    }
  };
  const handleSubmit = (formData) => {
    setSubmitedRequest(formData);
  };

  return (
    <BrowserRouter>
      <Navbar onNavbarClick={handleNavbarClick} />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              apprtmentData={apartmentsForMainPage}
              onSubmit={handleSubmit}
              dataLoaded={dataLoaded}
              cityName={cityName}
              sendToFavorites={setSelectedToFavorites}
            />
          }
        />
        <Route
          path="max"
          element={
            <OpeartionsPage
              cityName={cityName}
              onSubmit={handleSubmit}
              apartmentData={apartmentRequestData}
            />
          }
        />
        <Route
          path="favorites"
          element={
            <Favorites
              selectedApartments={selectedToFavorites}
              setSelectedToFavorites={setSelectedToFavorites}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

async function fetchDataFirstTime({
  setDataLoaded,
  setCityName,
  setApartmentsForMainPage,
}) {
  try {
    setDataLoaded(true);
    const data = await fetchFirstData();
    setCityName("TelAviv");
    setApartmentsForMainPage(data);
  } catch (error) {
    console.error(error);
  } finally {
    setDataLoaded(false);
  }
}

async function fetchDataBySubmitedForm({
  setDataLoaded,
  setCityName,
  setApartmentsForMainPage,
  setApartmentRequestData,
  submitedRequest,
}) {
  try {
    setDataLoaded(true);
    switch (submitedRequest.Request) {
      case "table":
        setCityName(submitedRequest.citySelected);
        const tableData = await fetchMainPageData(submitedRequest);
        setApartmentsForMainPage(tableData);
        break;
      case "minimum":
        const minimumData = await fetchOpreationsMiniuim();
        setApartmentRequestData(minimumData);
        break;
      case "maximum":
        const maxuimData = await fetchOpreationsMaxuim();
        setApartmentRequestData(maxuimData);
        break;
      case "price-between":
        const paramsPriceBetween = {
          minPrice: submitedRequest.minPrice,
          maxPrice: submitedRequest.maxPrice,
        };
        const priceRange = await fetchOpreationBetweenPriceRange(
          paramsPriceBetween
        );
        setApartmentRequestData(priceRange);
        break;
      case "number-of-apartments":
        const paramsNumberOfApartments = {
          numApartments: submitedRequest.numApartments,
        };
        const numberOfApartments = await fetchOpreationNumberOfApartments(
          paramsNumberOfApartments
        );
        setApartmentRequestData(numberOfApartments);
        break;
      case "update-value":
        const valueToUpdate = {
          city:submitedRequest.city,
          price:parseInt(submitedRequest.price),
          size:submitedRequest.size,
          rooms:parseInt(submitedRequest.rooms),
          floor:submitedRequest.floor
        }
        await updateApartmentsDataAPI(valueToUpdate,submitedRequest.index);
        setDataLoaded(false);
          break;
      default:
        break;
      // handle default case
    }
  } catch (error) {
    console.error(error);
  } finally {
    setDataLoaded(false);
  }
}
