import React, {useState } from 'react';
import ApartmentList from './ApartmentList';
import './MainPage.css';





function validateInput(minimumPrice,maximumPrice,minimumRoom,maximumRoom){
    if (maximumPrice < minimumPrice || maximumRoom < minimumRoom) {
        throw new Error('Invalid input');
      }
}

function MainPage({apprtmentData,onSubmit,dataLoaded,cityName}){
    const[citySelected, setCitySelected] = useState('TelAviv');
    const[minimumRoom,setMinimumRoom] = useState(2);
    const[maximumRoom,setMaximumRoom] = useState(5);
    const[minimumPrice,setMinimumPrice] = useState(1000000);
    const[maximumPrice,setMaxiumumPrice] = useState(2500000);
    const[numberPages,setNumberPages] = useState(3);
    
    const handleSubmited = (event)=> {
        event.preventDefault();
        try {
            if(dataLoaded){
                alert('Data is loading wait until response ');
                return;
            }
            validateInput(minimumPrice, maximumPrice, minimumRoom, maximumRoom);
            onSubmit({
              "Request":"table",
              citySelected,
              minimumRoom,
              maximumRoom,
              minimumPrice,
              maximumPrice,
              numberPages
         });
          } catch (error) {
            alert('Invalid input');
          }
    };
    return(
        <div className="main-form">
        <h1>Search for differnet appertments</h1>
        <form onSubmit={handleSubmited}>
                <SelectCity
                currentOperation={citySelected}
                setCurrentOperation={setCitySelected}
                />
                <SelecteRoomSize
                minimumRoom={minimumRoom}
                maximumRoom={maximumRoom}
                setMinimumRoom={setMinimumRoom}
                setMaximumRoom={setMaximumRoom}
                 />
                <SelectePriceRange 
                minimumPrice={minimumPrice}
                maximumPrice={maximumPrice}
                setMinimumPrice={setMinimumPrice}
                setMaxiumumPrice={setMaxiumumPrice}
                />
                <SelecteNumberOfPages
                numberPages={numberPages}
                setNumberPages={setNumberPages}
                 />
                <input type="submit" value="Search"></input>
            </form>
            <ApartmentList apartmentsData={apprtmentData} dataLoaded={dataLoaded} cityName={cityName} />
        </div>
       
    );
}

function SelectCity({ currentOperation, setCurrentOperation }) {
    return (
        <div className="select-city">
        <label htmlFor="select-city" >Chooese City</label>
        <select value={currentOperation} 
        onChange={(event)=>setCurrentOperation(event.target.value)}>
            <option value="TelAviv">TelAviv</option>
            <option value="RishonLezion">Rishon-Lezion</option>
            <option value="Jerusalem">Jerusalem</option>
            <option value="Haifa">Haifa</option>
        </select>
    </div>
    );
}

function SelecteRoomSize({minimumRoom,maximumRoom,setMinimumRoom,setMaximumRoom}){
   return(
        <div className="select-room-size">
        <label htmlFor="select-room-size" >minimum rooms</label>
            <input id="minimum-rooms-input" 
            type="number" 
            value={minimumRoom}
            onChange={(event)=> setMinimumRoom(event.target.value)}>
            </input>
        <label htmlFor="select-room-size" >maxiumum rooms</label>
            <input id="maximum-rooms-input" 
            type="number" 
            value={maximumRoom}
            onChange={(event)=> setMaximumRoom(event.target.value) }>
            </input>
        </div>
   );
}

function SelectePriceRange({minimumPrice,maximumPrice,setMinimumPrice,setMaxiumumPrice}){
    return(
        <div className="selecte-price-range">
                        <label htmlFor="selecte-price-range" >minimum price</label>
                            <input id="minimum-price-input" 
                            type="number" 
                            value={minimumPrice}
                            onChange={(event)=>setMinimumPrice(event.target.value)}>
                            </input>
                        <label htmlFor="selecte-price-range" >maxiumum price</label>
                            <input id="maximum-price-input" type="number" 
                            value={maximumPrice}
                            onChange={(event)=>setMaxiumumPrice(event.target.value)}>
                            </input>
                </div>
    );

}

function SelecteNumberOfPages({numberPages,setNumberPages}){
    return(
        <div className='select-number-pages'>
                    <label htmlFor="selecte-number-pages" >selecte-number-pages</label>
                        <input id="number-of-pages" type="number" 
                            value={numberPages}
                            onChange={(event)=>setNumberPages(event.target.value)}>
                            </input>
                </div>
    );
}





export default MainPage;