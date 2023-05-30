import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const storedFavoriteIds = localStorage.getItem('favoriteIds');
    return storedFavoriteIds ? JSON.parse(storedFavoriteIds) : [];
  });

  const handleDeleteClick = (id) => {
    setFavoriteIds(prev => prev.filter(i => i !== id));
    setFavorites(prev => prev.filter(appartment => appartment._id !== id))
  }

  const handleMapClick = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(googleMapsUrl, '_blank');
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [favorites, favoriteIds])

  return (
    <div className='container max-w-screen-xl mx-auto flex justify-center gap-4 flex-wrap my-4'>
      {favorites.length === 0 && (
        <div className='flex flex-col items-center justify-center h-[50vh]'>
          <h1 className='font-bold text-slate-900 text-5xl pb-8'>You didn't select any favorite appartemnts.. 🤷🏻‍♂️</h1>
          <p className='font-bold text-slate-900 text-2xl pb-4'>Let's go back and select a few..</p>
          <NavLink className="text-slate-900 text-xl rounded-xl border-2 border-slate-400 bg-slate-200 px-4 py-2 shadow-md" to="/">Go Back</NavLink>
        </div>
      )}
      {favorites.map(appartment => (
        <div
          key={appartment._id}
          className="container flex flex-col items-center rounded-xl py-2 shadow-md border-2 max-w-sm bg-slate-200"
        >
          <p className='font-bold text-lg pb-1'>{appartment.city}</p>
          <div className='flex flex-wrap gap-1'>
            <p className='px-2 py-1 rounded-md w-max bg-slate-50'>{appartment.price} ש"ח</p>
            <p className='px-2 py-1 rounded-md w-max bg-slate-50'>{appartment.size}</p>
            <p className='px-2 py-1 rounded-md w-max bg-slate-50'>{appartment.rooms} חדרים</p>
            <p className='px-2 py-1 rounded-md w-max bg-slate-50'>{appartment.floor}</p>
          </div>
          <div className='flex justify-center gap-2 pt-2 w-full'>
            <MapPinIcon
              className="w-9 h-9 cursor-pointer rounded-full bg-slate-50 p-1 border-2 border-slate-400 hover:bg-slate-100"
              onClick={() => handleMapClick(appartment.city)}
            />
            <TrashIcon
              className='w-9 h-9 cursor-pointer rounded-full bg-slate-50 p-1 border-2 border-slate-400 hover:bg-slate-100'
              onClick={() => handleDeleteClick(appartment._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;