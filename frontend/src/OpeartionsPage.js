import React, { useState, useEffect } from 'react';
import './OpeartionsPage.css';
import './Table.css';

export default function OpeartionsPage({cityName,onSubmit,apartmentData}){
    const [opeartionsPageProps,setOpeartionsPageProps] =useState({
      appData:[],
      isRequestGivin:"",
      currentOperation:"minimum",
      minPrice:0,
      maxPrice:0,
      numApartments:0
    });

    useEffect(()=>{
      setOpeartionsPageProps((prevState)=>({
        ...prevState,
        appData:apartmentData
      }));
    },[apartmentData]);
    const handleInputeChange = (fieldName,value)=>{
      setOpeartionsPageProps((prevState)=>({
        ...prevState,
        [fieldName]:value
      }));
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        if (opeartionsPageProps.currentOperation === "price-between" && (opeartionsPageProps.minPrice > opeartionsPageProps.maxPrice)) {
            alert("Please select a valid price range");
            return;
        }
        onSubmit({
            "Request": opeartionsPageProps.currentOperation,
            "cityName": cityName,
            "minPrice": opeartionsPageProps.minPrice,
            "maxPrice": opeartionsPageProps.maxPrice,
            "numApartments":opeartionsPageProps.numApartments
        });
        handleInputeChange("isRequestGivin",opeartionsPageProps.currentOperation);
    };
    const mainForm =(
    <div className="max-min-container">
            <form>
                <div>
                    <label htmlFor="city-name">Current city: {cityName}</label>
                    <br/>
                    <label>You can search for this set choose what you want</label>
                    <SelectOperation
                        currentOperation={opeartionsPageProps.currentOperation}
                        setCurrentOperation={handleInputeChange}
                        />
                        {opeartionsPageProps.currentOperation === "price-between" && (
                         <PriceRangeInput 
                         minPrice={opeartionsPageProps.minPrice}
                         maxPrice={opeartionsPageProps.maxPrice}
                         onInputChange={handleInputeChange}
                       />
                    )}
                      {opeartionsPageProps.currentOperation === "number-of-apartments" && (
                        <NumberOfApartments 
                        numApartments={opeartionsPageProps.numApartments} 
                        setNumApartments={handleInputeChange}
                      />
                    )}
                    {opeartionsPageProps.currentOperation === "get-apartment-index" && (
                      <GetNumberOfApartmentsByIndex
                      numApartments={opeartionsPageProps.numApartments} 
                      setNumApartments={handleInputeChange}/>
                    )

                    }
                    <button htmlFor="max-min-container"
                    type="button" onClick={handleSubmit}>search</button>
                 </div>
            </form>
            {opeartionsPageProps.isRequestGivin && (
                        <div>
                            <h1>Current operation:{opeartionsPageProps.isRequestGivin}</h1>
                            {opeartionsPageProps.appData && 
                            (RenderTable(opeartionsPageProps.appData))
                            }
                        </div>
                  )}</div>
                        );
    return mainForm;
}


function RenderTable(apartments){
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className="sticky-header">#</th>
                        <th className="sticky-header">City</th>
                        <th className="sticky-header">Price</th>
                        <th className="sticky-header">Size</th>
                        <th className="sticky-header">Rooms</th>
                        <th className="sticky-header">Floor</th>
                    </tr>
                </thead>
                <tbody>
                {apartments.map((apartment, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{apartment.city}</td>
                    <td>{apartment.price}</td>
                    <td>{apartment.size}</td>
                    <td>{apartment.rooms}</td>
                    <td>{apartment.floor}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


function SelectOperation({ currentOperation, setCurrentOperation }) {
    return (
      <div className="select-operation">
        <label htmlFor="select-operation">Select your operation</label>
        <select
          value={currentOperation}
          onChange={(event) => setCurrentOperation("currentOperation",event.target.value)}
        >
          <option value="minimum">minimum</option>
          <option value="maximum">maximum</option>
          <option value="price-between">price-between</option>
          <option value="number-of-apartments">number-of-apartments</option>
          <option value="get-apartment-index">get-apartment-by-index</option>
        </select>
      </div>
    );
}

function PriceRangeInput({ minPrice, maxPrice, onInputChange }) {
    return (
      <div>
        <label htmlFor="min-price">Minimum price:</label>
        <input 
          type="number" 
          id="min-price" 
          value={minPrice} 
          onChange={(event)=>onInputChange("minPrice",parseInt(event.target.value))}
        />
        <br />
        <label htmlFor="max-price">Maximum price:</label>
        <input 
          type="number" 
          id="max-price" 
          value={maxPrice} 
          onChange={(event)=>onInputChange("maxPrice",parseInt(event.target.value))}
        />
      </div>
    );
}

function NumberOfApartments({ numApartments, setNumApartments }) {
    return (
      <div>
        <label htmlFor="num-apartments">Number of apartments:</label>
        <input 
          type="number" 
          id="num-apartments" 
          value={numApartments} 
          onChange={(event)=>setNumApartments("numApartments",parseInt(event.target.value))}
        />
      </div>
    );
  }


function GetNumberOfApartmentsByIndex({numApartments,setNumApartments}){
  return(<div>
     <label htmlFor="apartment-by-index">apartment-by-index:</label>
     <input
     type="number"
     id="apartment-by-index"
     value={numApartments}
     onChange={(event)=>setNumApartments("numApartments",parseInt(event.target.value))}/>
  </div>);

}