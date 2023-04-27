import React, { useEffect, useState } from 'react';
import ApartmentList from './ApartmentList';
import './MainPage.css';




function MainPage({apprtmentData,userWantsToChangeData}){
    const[citySelected, setCitySelected] = useState('TelAviv');
    const[minimumRoom,setMinimumRoom] = useState(2);
    const[maximumRoom,setmaximumRoom] = useState(5);
    const[minimumPrice,setMinimumPrice] = useState(1000000);
    const[maxiumumPrice,setMaxiumumPrice] = useState(2500000);
    
    const handleSubmited = ()=> {
        userWantsToChangeData(true);
    };
    return(
        <div className="main-form">
        <h1>Search for differnet appertments</h1>
        <form onSubmit={handleSubmited}>
                <div className="select-city">
                    <label htmlFor="select-city" >Chooese City</label>
                    <select value={citySelected} 
                    onChange={(event)=>setCitySelected(event.target.value)}>
                        <option value="TelAviv">TelAviv</option>
                        <option value="RishonLezion">Rishon-Lezion</option>
                        <option value="Jerusalem">Jerusalem</option>
                        <option value="Haifa">Haifa</option>
                    </select>
                </div>
                <div className="select-room-size">
                    <label htmlFor="select-room-size" >minimum rooms</label>
                        <input id="minimum-rooms-input" 
                        type="number" 
                        value={minimumRoom}
                        onChange={(event)=> setMinimumRoom(event.target.value)}></input>
                    <label htmlFor="select-room-size" >maxiumum rooms</label>
                        <input id="maximum-rooms-input" 
                        type="number" 
                        value={maximumRoom}
                        onChange={(event)=> setmaximumRoom(event.target.value) }></input>
                </div>
                <div className="selecte-price-range">
                        <label htmlFor="selecte-price-range" >minimum price</label>
                            <input id="minimum-price-input" 
                            type="number" 
                            value={minimumPrice}
                            onChange={(event)=>setMinimumPrice(event.target.value)}></input>
                        <label htmlFor="selecte-price-range" >maxiumum price</label>
                            <input id="maximum-price-input" type="number" 
                            value={maxiumumPrice}
                            onChange={(event)=>setMaxiumumPrice(event.target.value)}></input>
                </div>
                <input type="submit" value="Search"></input>
            </form>
            <ApartmentList setApartmentsAPI={apprtmentData} />
        </div>
       
    );

}


export default MainPage;