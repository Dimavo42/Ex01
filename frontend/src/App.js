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
} from "./ApiHandler";

export default function App() {
  const [apartmentsForMainPage, setApartmentsForMainPage] = useState([]);
  const [submitedForm, setSubmitedForm] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cityName, setCityName] = useState("");
  const [apartmentRequestData, setApartmentRequestData] = useState([]);
  const [selectedToFavorites, setSelectedToFavorites] = useState([]);
  useEffect(() => {
    if (submitedForm.Request) {
      fetchDataBySubmitedForm({
        setDataLoaded,
        setApartmentsForMainPage,
        setApartmentRequestData,
        submitedForm,
        setCityName,
      });
      return;
    }
    fetchDataFirstTime({
      setDataLoaded,
      setCityName,
      setApartmentsForMainPage,
    });
  }, [submitedForm]);
  const handleNavbarClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
    }
  };
  const handleSubmit = (formData) => {
    setSubmitedForm(formData);
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
              SelectedToFavorites={setSelectedToFavorites}
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
          element={<Favorites selectedApartments={selectedToFavorites} />}
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
  submitedForm,
}) {
  try {
    setDataLoaded(true);
    switch (submitedForm.Request) {
      case "table":
        setCityName(submitedForm.citySelected);
        const tableData = await fetchMainPageData(submitedForm);
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
          minPrice: submitedForm.minPrice,
          maxPrice: submitedForm.maxPrice,
        };
        const priceRange = await fetchOpreationBetweenPriceRange(
          paramsPriceBetween
        );
        setApartmentRequestData(priceRange);
        break;
      case "number-of-apartments":
        const paramsNumberOfApartments = {
          numApartments: submitedForm.numApartments,
        };
        const numberOfApartments = await fetchOpreationNumberOfApartments(
          paramsNumberOfApartments
        );
        setApartmentRequestData(numberOfApartments);
        break;
      default:
      // handle default case
    }
  } catch (error) {
    console.error(error);
  } finally {
    setDataLoaded(false);
  }
}
