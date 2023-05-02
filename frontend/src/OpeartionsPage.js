import React, { useState, useEffect } from 'react';
import './OpeartionsPage.css';
import './Table.css';

export default function OpeartionsPage({cityName,onSubmit,apartmentData}){
    const [isRequestGivin, setIsRequestGivin] = useState("");
    const [appData,setAppData] = useState([]);
    const[currentOperation,setCurrentOperation] = useState("minimum");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [numApartments, setNumApartments] = useState(0);
    useEffect(()=>{
        setAppData(apartmentData);
    },[apartmentData]);

    const handleSubmit = (event)=>{
        event.preventDefault();
        if (currentOperation === "price-between" && (minPrice > maxPrice)) {
            alert("Please select a valid price range");
            return;
        }
        onSubmit({
            "Request": currentOperation,
            "cityName": cityName,
            "minPrice": minPrice,
            "maxPrice": maxPrice,
            "numApartments":numApartments
        });
        setIsRequestGivin(currentOperation);
    };
    const mainForm =(
    <div className="max-min-container">
            <form>
                <div>
                    <label htmlFor="city-name">Current city: {cityName}</label>
                    <br/>
                    <label>You can search for this set choose what you want</label>
                    <SelectOperation
                        currentOperation={currentOperation}
                        setCurrentOperation={setCurrentOperation}
                        />
                        {currentOperation === "price-between" && (
                         <PriceRangeInput 
                         minPrice={minPrice}
                         maxPrice={maxPrice}
                         setMinPrice={setMinPrice}
                         setMaxPrice={setMaxPrice}
                       />
                    )}
                      {currentOperation === "number-of-apartments" && (
                        <NumberOfApartments 
                        numApartments={numApartments} 
                        setNumApartments={setNumApartments}
                      />
                    )}
                    <button htmlFor="max-min-container"
                    type="button" onClick={handleSubmit}>search</button>
                 </div>
            </form>
            {isRequestGivin && (
                        <div>
                            <h1>Current operation:{isRequestGivin}</h1>
                            {appData && 
                            (RenderTable(appData))
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
          onChange={(event) => setCurrentOperation(event.target.value)}
        >
          <option value="minimum">minimum</option>
          <option value="maximum">maximum</option>
          <option value="price-between">price-between</option>
          <option value="number-of-apartments">number-of-apartments</option>
        </select>
      </div>
    );
}

function PriceRangeInput({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
    return (
      <div>
        <label htmlFor="min-price">Minimum price:</label>
        <input 
          type="number" 
          id="min-price" 
          value={minPrice} 
          onChange={(event)=>setMinPrice(event.target.value)}
        />
        <br />
        <label htmlFor="max-price">Maximum price:</label>
        <input 
          type="number" 
          id="max-price" 
          value={maxPrice} 
          onChange={(event)=>setMaxPrice(event.target.value)}
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
          onChange={(event)=>setNumApartments(event.target.value)}
        />
      </div>
    );
  }



