import React, { useState, useEffect } from 'react';
import './maxMin.css'

function MaxMin({cityName,onSubmit,dataLoaded,apartmentData}){
    const [isRequestGivin, setIsRequestGivin] = useState(false);
    const [appData,setAppData] = useState([]);
    const[currentOpreation,setCurrentOpreation] = useState("false");
    useEffect(()=>{
        setAppData(apartmentData);
    },[apartmentData]);

    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit({"Request":"Find_Miniume",cityName});
        setIsRequestGivin(true);
    };
    
    const mainForm =(<div className="max-min-container">
            <form>
                <div>
                    <label htmlFor="city-name">Current city {cityName}</label>
                    <br/>
                    <label>You can search for this set chooese what you want</label>
                    <div className="select-opreation">
                        <label htmlFor="select-opreation" >select your opreation</label>
                        <select value={currentOpreation} 
                        onChange={(event)=>setCurrentOpreation(event.target.value)}>
                            <option value="minimum">minimum</option>
                            <option value="maximum">maximum</option>
                            <option value="price-between">price-between</option>
                        </select>
                </div>
                    <button htmlFor="max-min-container"
                    type="button" onClick={handleSubmit}>search</button>
                 </div>
            </form>
            {isRequestGivin && (
                <div>
                    <p>price: {appData.price}</p>
                    <p>city: {appData.city}</p>
                    <p>city: {appData.rooms}</p>
                    <p>city: {appData.size}</p>
                </div>
            )}
                
        </div>);
    return mainForm;
    
}




export default MaxMin;