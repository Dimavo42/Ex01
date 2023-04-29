import React, { useState, useEffect } from 'react';
import './maxMin.css'

function MaxMin({cityName}){

    return (
        <div className="max-min-container">
            <form>
                <div>
                    <label htmlFor="city-name">Current city {cityName}</label>
                    <br/>
                    <label>you can find miniuim</label>
                    <button htmlFor="city-name"
                    type="button">search</button>
                 </div>
            </form>
            
        </div>
    );
}

export default MaxMin;