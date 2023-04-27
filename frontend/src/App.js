import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Navbar from './Navbar';
import MaxMin from './maxMin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [apartments, setApartmentData] = useState([]);
  const[userAskedForNewData,setUserAskedForNewData] = useState(false);
  useEffect(()=>{
    setApartmentData(apartments);
  });

  const handleNavbarClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
    }
  }
  return (
    <BrowserRouter>
        <Navbar onNavbarClick={handleNavbarClick}/>
        <Routes>
          <Route path='/'  element={<MainPage apprtmentData={setApartmentData} userWantsToChangeData={setUserAskedForNewData}/>} />
          <Route path="max" element={<MaxMin apartmentData={apartments}/>}/>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
