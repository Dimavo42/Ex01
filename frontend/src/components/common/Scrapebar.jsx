import React, { useState } from 'react';
import { scrape } from '../../api/ApiHandler';
import * as Yup from 'yup';

const scrapeSchema = Yup.object().shape({
  citySelected: Yup.string().min(1),
  minimumRoom: Yup.number().min(1),
  maximumRoom: Yup.number().min(1),
  minimumPrice: Yup.number().min(1),
  maximumPrice: Yup.number().min(1),
  numberPages: Yup.number().min(1),
})

const Scrapebar = ({ fetchAllAppartments }) => {
  const [scrapeRequest, setScrapeRequest] = useState({
    citySelected: "TelAviv",
    minimumRoom: "",
    maximumRoom: "",
    minimumPrice: "",
    maximumPrice: "",
    numberPages: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputeChange = (fieldName, value) => {
    setScrapeRequest((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  function validateInput(minimumPrice, maximumPrice, minimumRoom, maximumRoom) {
    if (maximumPrice < minimumPrice || maximumRoom < minimumRoom) {
      throw new Error("Invalid input");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      try {
        validateInput(scrapeRequest.minimumPrice, scrapeRequest.maximumPrice, scrapeRequest.minimumRoom, scrapeRequest.maximumRoom);
        await scrapeSchema.validate(scrapeRequest);
        scrape(scrapeRequest)
          .then(() => {
            setLoading(false);
          });
        fetchAllAppartments();
      } catch (error) {
        alert("Invalid input");
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center gap-4 py-2 bg-slate-300 shadow-md">

        {/* CITY */}
        <div className="flex gap-1 text-slate-950">
          <label htmlFor="city" className="font-bold">
            City:
          </label>
          <select
            className="px-1 border-2 border-slate-500 bg-slate-50 rounded-md"
            name="city"
            id="city"
            value={scrapeRequest.citySelected}
            onChange={e => handleInputeChange("citySelected", e.target.value)}
          >
            <option value="TelAviv">TelAviv</option>
            <option value="RishonLezion">Rishon-Lezion</option>
            <option value="Jerusalem">Jerusalem</option>
            <option value="Haifa">Haifa</option>
          </select>
        </div>

        {/* ROOMS */}
        <div className="flex gap-1 text-slate-950">
          <label htmlFor="city" className="font-bold">
            Rooms:
          </label>
          <div>
            <input
              className="px-1 w-16 border-2 border-slate-500 bg-slate-50 rounded-md"
              name="rooms"
              placeholder="min"
              id="minimum-price-input"
              type="number"
              value={scrapeRequest.minimumRoom}
              onChange={(event) => handleInputeChange("minimumRoom", parseInt(event.target.value))}
            />
          </div>
          <div>
            <input
              className="px-1 w-16 border-2 border-slate-500 bg-slate-50 rounded-md"
              name="rooms"
              placeholder="max"
              id="maximum-price-input"
              type="number"
              value={scrapeRequest.maximumRoom}
              onChange={(event) => handleInputeChange("maximumRoom", parseInt(event.target.value))}
            />
          </div>
        </div>

        {/* PRICE */}
        <div className="flex gap-1 text-slate-950">
          <label htmlFor="price" className="font-bold">
            Price:
          </label>
          <div>
            <input
              className="px-1 w-28 border-2 border-slate-500 bg-slate-50 rounded-md"
              name="price"
              placeholder="min"
              id="minimum-price-input"
              type="number"
              value={scrapeRequest.minimumPrice}
              onChange={(event) => handleInputeChange("minimumPrice", parseInt(event.target.value))}
            />
          </div>
          <div>
            <input
              className="px-1 w-28 border-2 border-slate-500 bg-slate-50 rounded-md"
              name="price"
              placeholder="max"
              id="maximum-price-input"
              type="number"
              value={scrapeRequest.maximumPrice}
              onChange={(event) => handleInputeChange("maximumPrice", parseInt(event.target.value))}
            />
          </div>
        </div>

        {/* PAGES */}
        <div className="flex gap-1 text-slate-950">
          <label htmlFor="pages" className="font-bold">
            Pages:
          </label>
          <input
            className="px-1 w-16 border-2 border-slate-500 bg-slate-50 rounded-md"
            placeholder="min"
            name="pages"
            id="number-of-pages"
            type="number"

            value={scrapeRequest.numberPages}
            onChange={(event) => handleInputeChange("numberPages", parseInt(event.target.value))}
          ></input>
        </div>

        {/* SUBMIT */}
        <button formAction="SUBMIT" className={"rounded-md border-2 border-slate-500 px-4 " + (loading ? "bg-red-100" : "bg-green-100")}>Scrape</button>
      </form>
    </div>
  );
};

export default Scrapebar;