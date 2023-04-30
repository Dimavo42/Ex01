import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Navbar from './Navbar';
import OpeartionsPage from './OpeartionsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {fetchMainPageData,fetchFirstData,fetchOpreationsMiniuim,fetchOpreationsMaxuim,fetchOpreationBetweenPriceRange,fetchOpreationNumberOfApartments }from './ApiHandler';

function App() {
  const [apartmentsForMainPage, setApartmentsForMainPage] = useState([]);
  const [submitedForm, setSubmitedForm] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cityName,setCityName] = useState("");
  const [apartmentRequestData,setApartmentRequestData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!dataLoaded) {
        const data = await fetchFirstData();
        setCityName("TelAviv")
        setApartmentsForMainPage(data);
        setDataLoaded(false);
      }
      switch (submitedForm.Request) {
        case "table":
          setDataLoaded(true);
          setCityName(submitedForm.citySelected);
          const tableData = await fetchMainPageData(submitedForm);
          setApartmentsForMainPage(tableData);
          setDataLoaded(false);
          break;
        case "minimum":
          setDataLoaded(true);
          const minimumData  = await fetchOpreationsMiniuim();
          setApartmentRequestData(minimumData);
          setDataLoaded(false);
          break;
        case "maximum":
          setDataLoaded(true);
          const maxuimData  = await fetchOpreationsMaxuim();
          setApartmentRequestData(maxuimData);
          setDataLoaded(false);
          break;
        case "price-between":
          setDataLoaded(true);
          const paramsPriceBetween = {"minPrice":submitedForm.minPrice ,"maxPrice":submitedForm.maxPrice};
          const priceRange = await fetchOpreationBetweenPriceRange(paramsPriceBetween);
          setApartmentRequestData(priceRange);
          setDataLoaded(false);
          break;
        case "number-of-apartments":
          setDataLoaded(true);
          const paramsNumberOfApartments = {"numApartments":submitedForm.numApartments};
          const numberOfApartments = await fetchOpreationNumberOfApartments(paramsNumberOfApartments);
          setApartmentRequestData(numberOfApartments);
          setDataLoaded(false);
          break;
        default:
          // handle default case
      }
    }
    fetchData();
  }, [submitedForm]);
  const handleNavbarClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
    }
  }
  const handleSubmit = (formData) => {
    setSubmitedForm(formData);
  }
  


  return (
    <BrowserRouter>
        <Navbar onNavbarClick={handleNavbarClick}/>
        <Routes>
          <Route path='/'  element={<MainPage apprtmentData={apartmentsForMainPage} onSubmit={handleSubmit} dataLoaded={dataLoaded} cityName={cityName}/>} />
          <Route path="max" element={<OpeartionsPage cityName={cityName} onSubmit={handleSubmit} apartmentData={apartmentRequestData} />}/>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
