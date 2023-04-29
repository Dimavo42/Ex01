import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Navbar from './Navbar';
import MaxMin from './maxMin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {fetchFormData,fetchFirstData,fetchMiniuim }from './ApiHandler';

function App() {
  const [apartments, setApartmentData] = useState([]);
  const [submitedForm, setSubmitedForm] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cityName,setCityName] = useState("");
  const [singleApartmentRequest,setsingleApartmentRequest] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!dataLoaded) {
        const data = await fetchFirstData();
        setCityName("TelAviv")
        setApartmentData(data);
        setDataLoaded(false);
      }
      if (submitedForm.Request == "New_Table") {
        setDataLoaded(true);
        setCityName(submitedForm.citySelected);
        const data = await fetchFormData(submitedForm);
        setApartmentData(data);
        setDataLoaded(false);
      }
      if(submitedForm.Request == "Find_Miniume")
      {
        setDataLoaded(true);
        const data = await fetchMiniuim();
        setsingleApartmentRequest(data);
        setDataLoaded(false);
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
          <Route path='/'  element={<MainPage apprtmentData={apartments} onSubmit={handleSubmit} dataLoaded={dataLoaded} cityName={cityName}/>} />
          <Route path="max" element={<MaxMin cityName={cityName} onSubmit={handleSubmit} dataLoaded={dataLoaded} apartmentData={singleApartmentRequest} />}/>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
