import React, { useState, useEffect } from 'react';
import './maxMin.css'

function MaxMin({cityName,onSubmit,dataLoaded,apartmentData}){
    const [isRequestGivin, setIsRequestGivin] = useState(false);
    const [appData,setAppData] = useState([]);
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
                    <label>you can find miniuim</label>
                    <button htmlFor="city-name"
                    type="button" onClick={handleSubmit}>search</button>
                 </div>
            </form>
            <ul>
                {appData.map((apartment, index) => (
                    <li key={index}>
                        {apartment}
                    </li>
                ))}
            </ul>
                
        </div>);
    return mainForm;
    
}




export default MaxMin;