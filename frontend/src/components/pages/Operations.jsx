import React, { useState } from 'react';
import { getAppatmentsByCity, getByPriceRange, getMaxPrice, getMinPrice, getNumberOfAppartments } from '../../api/ApiHandler';
import Table from '../common/Table';

const operations = [
  "min",
  "max",
  "range",
  "amount",
  "city",
]

const cities = [
  "TelAviv",
  "Rishon-Lezion",
  "Jerusalem",
  "Haifa",
]

const Operations = () => {
  const [appartments, setAppartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(operations[0]);

  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [amount, setAmount] = useState("");

  const handleGetClick = () => {
    if (!loading) {
      setLoading(true);
      switch (selectedOperation) {
        case "min":
          getMinPrice()
            .then(res => {
              setAppartments(res.data.number_of_items);
              console.log(res.data.number_of_items);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });

          break;
        case "max":
          getMaxPrice()
            .then(res => {
              setAppartments(res.data.number_of_items);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
          break;
        case "range":
          getByPriceRange(min, max)
            .then(res => {
              setAppartments(res.data.number_of_items);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
          break;
        case "amount":
          getNumberOfAppartments(amount)
            .then(res => {
              setAppartments(res.data.number_of_items);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
          break;
        case "city":
          getAppatmentsByCity(selectedCity)
            .then(res => {
              setAppartments(res.data.number_of_items);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
          break;
        default:
          console.log("error");
          setLoading(false);
          break;
      }
    }
  }


  return (
    <div>
      <div
        className='container w-48 flex flex-col p-2 rounded-md shadow-md m-auto bg-slate-300 mt-4'
      >
        <label
          className="font-bold"
          htmlFor="operation"
        >
          Select Operation:
        </label>
        <select
          className="px-1 w-28 border-2 border-slate-500 bg-slate-50 rounded-md mb-2"
          name="operation"
          id="operation"
          onChange={(e) => {
            setSelectedOperation(e.target.value);
          }}
        >
          {operations.map(op => (
            <option name={op} id={op} key={op}>{op}</option>
          ))}
        </select>

        {selectedOperation === "range" && (
          <div className='mb-2'>
            <label
              htmlFor="range"
            >
              Price range:
            </label>
            <div className='flex gap-1 justify-between'>
              <input
                className="w-20 px-1 border-2 border-slate-500 bg-slate-50 rounded-md"
                type="number"
                value={min}
                placeholder="min"
                onChange={(e) => setMin(e.target.value)}
              />
              <input
                className="w-20 px-1 border-2 border-slate-500 bg-slate-50 rounded-md"
                type="number"
                value={max}
                placeholder="max"
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>
        )}

        {selectedOperation === "amount" && (
          <div className='mb-2'>
            <label
              htmlFor="amount"
            >
              Amount of appartments:
            </label>
            <input
              className="px-1 w-28 border-2 border-slate-500 bg-slate-50 rounded-md"
              type="number"
              value={amount}
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}

        {selectedOperation === "city" && (
          <div className='mb-2'>
            <label
              htmlFor="city"
            >
              Filter by city:
            </label>
            <select
              className="px-1 w-28 border-2 border-slate-500 bg-slate-50 rounded-md"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map(city => (
                <option
                  id={city}
                  value={city}
                >
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          className={"rounded-md border-2 border-slate-500 px-4 " + (loading ? "bg-red-100" : "bg-green-100")}
          onClick={() => handleGetClick()}
        >
          get
        </button>
      </div >
      {appartments && appartments.length > 0 ? (
        <Table appartments={appartments} refetchAllAppartments={() => { }} />
      ) : (
        <h1 className='text-4xl font-bold text-center mt-4'>Empty 🤷🏻‍♂️</h1>
      )}
    </div>
  );
};

export default Operations;