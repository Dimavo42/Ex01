import React, { useEffect, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { MapPinIcon, StarIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { updateAppartment } from '../../api/ApiHandler';

const Table = ({ appartments, refetchAllAppartments }) => {
  const [sortedColumn, setSortedColumn] = useState('price');
  const [sortDirection, setSortDirection] = useState(true);
  const [sortedAppartments, setSortedAppartments] = useState([]);
  const [editIds, setEditIds] = useState([]);
  const [editedValues, setEditedValues] = useState({});

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const storedFavoriteIds = localStorage.getItem('favoriteIds');
    return storedFavoriteIds ? JSON.parse(storedFavoriteIds) : [];
  });

  const SortIcon = (columnName) => {
    if (sortedColumn === columnName.columnName) {
      if (sortDirection) {
        return (
          <div className="flex flex-col px-0.5 font-bold">
            <ChevronUpIcon className="h-4 w-4 mb-[-3px]" />
            <span className="h-4 w-4 mt-[-3px]" />
          </div>
        )
      } else {
        return (
          <div className="flex flex-col px-0.5 font-bold">
            <span className="h-4 w-4 mb-[-3px]" />
            <ChevronDownIcon className="h-4 w-4 mt-[-3px]" />
          </div>
        )
      }
    }
    return (
      <div className="flex flex-col px-0.5 font-bold">
        <ChevronUpIcon className="h-4 w-4 mb-[-3px]" />
        <ChevronDownIcon className="h-4 w-4 mt-[-3px]" />
      </div>
    )
  };

  const handleSort = (columnName) => {
    if (sortedColumn === columnName) {
      setSortDirection(!sortDirection);
    } else {
      setSortedColumn(columnName);
      setSortDirection(true);
    }
  }

  const handleSortAppartments = () => {
    if (appartments && appartments.length > 0) {
      const sorted = [...appartments].sort((a, b) => {
        if (sortedColumn === "size") {
          if (sortDirection) {
            return a[sortedColumn].split(" ")[0] - b[sortedColumn].split(" ")[0];
          } else {
            return b[sortedColumn].split(" ")[0] - a[sortedColumn].split(" ")[0];
          }
        }

        if (sortDirection) {
          return a[sortedColumn] - b[sortedColumn];
        } else {
          return b[sortedColumn] - a[sortedColumn];
        }
      })

      setSortedAppartments(sorted);
    }
  }

  const handleFavoriteClick = (appartment) => {
    const index = favoriteIds.findIndex(id => id === appartment._id);

    if (index !== -1) {
      setFavoriteIds(prev => prev.filter(id => id !== appartment._id));
      setFavorites(prev => prev.filter(aprtmnt => aprtmnt._id !== appartment._id))
    } else {
      setFavoriteIds(prev => [...prev, appartment._id]);
      setFavorites(prev => [...prev, appartment]);
    }
  }

  const handleMapClick = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(googleMapsUrl, '_blank');
  }

  const handleEditClick = (id) => {
    const updatedIds = [...editIds, id];
    setEditIds(updatedIds);
  }

  const handleInputChange = (id, field, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveClick = (id) => {
    const editedApartment = editedValues[id];

    const updatedApartment = {
      ...appartments.find((apartment) => apartment._id === id),
      ...editedApartment,
    };

    const { city, floor, price, rooms, size } = updatedApartment;
    updateAppartment(id, { city, floor, price, rooms, size })
      .then(() => {
        setEditIds(prev => prev.filter((editId) => editId !== id));
        setEditedValues(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        refetchAllAppartments();
      })
      .catch(err => console.log(err));

  };



  useEffect(() => {
    handleSortAppartments();
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [appartments, sortDirection, sortedColumn, favorites, favoriteIds])

  return (
    <table className='table-auto container max-w-screen-xl m-auto bg-slate-200 rounded-xl my-8 shadow-xl overflow-hidden'>
      <thead>
        <tr>
          <th>Fav</th>
          <th className='p-2'>Location</th>
          <th className='cursor-pointer p-2' onClick={() => handleSort('price')}>
            <div className={'flex justify-center items-center ' + (sortedColumn === "price" && 'underline underline-offset-2')}>
              Price
              <SortIcon columnName='price' />
            </div>
          </th>
          <th className='cursor-pointer p-2' onClick={() => handleSort('size')}>
            <div className={'flex justify-center items-center ' + (sortedColumn === "size" && 'underline underline-offset-2')}>
              Size
              <SortIcon columnName='size' />
            </div>
          </th>
          <th className='cursor-pointer p-2' onClick={() => handleSort('rooms')}>
            <div className={'flex justify-center items-center ' + (sortedColumn === "rooms" && 'underline underline-offset-2')}>
              Rooms
              <SortIcon columnName='rooms' />
            </div>
          </th>
          <th className='p-2'>
            Floor
          </th>
          <th className='p-2'>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedAppartments && sortedAppartments.length > 0 && sortedAppartments.map((appartment) => (
          <>
            {editIds.includes(appartment._id) ? (
              <>
                <tr key={appartment._id} className="bg-slate-100 hover:bg-slate-200">
                  <td className='border-t-2 border-slate-50 p-1 text-center'>
                    <StarIcon
                      className={"w-5 m-auto text-slate-500 " + (favoriteIds.includes(appartment._id) && "fill-yellow-400")}
                    />
                  </td>
                  <td className='border-t-2 border-slate-50 p-1 text-right'>
                    <input
                      className='w-full text-right'
                      type="text"
                      value={editedValues[appartment._id]?.city || appartment.city}
                      onChange={(e) => handleInputChange(appartment._id, 'city', e.target.value)}
                    />
                  </td>
                  <td className='border-t-2 border-slate-50 p-1 text-center'>
                    <input
                      className='text-center'
                      type="number"
                      value={editedValues[appartment._id]?.price || appartment.price}
                      onChange={(e) => handleInputChange(appartment._id, 'price', e.target.value)}
                    />
                  </td>
                  <td className='border-t-2 border-slate-50 p-1 text-center'>
                    <input
                      className='text-center'
                      type="text"
                      value={editedValues[appartment._id]?.size || appartment.size}
                      onChange={(e) => handleInputChange(appartment._id, 'size', e.target.value)}
                    />
                  </td>
                  <td className='border-t-2 border-slate-50 p-1 text-center'>
                    <input
                      className='text-center'
                      type="text"
                      value={editedValues[appartment._id]?.rooms || appartment.rooms}
                      onChange={(e) => handleInputChange(appartment._id, 'rooms', e.target.value)}
                    />
                  </td>
                  <td className='border-t-2 border-slate-50 p-1 text-center'>
                    <input
                      className='text-center'
                      type="text"
                      value={editedValues[appartment._id]?.floor || appartment.floor}
                      onChange={(e) => handleInputChange(appartment._id, 'floor', e.target.value)}
                    />
                  </td>
                  <td className='border-t-2 border-slate-50 p-1 text-center'>
                    <div className="flex justify-evenly">
                      <button
                        className='rounded-md border-2 border-slate-500 px-4 bg-green-100'
                        onClick={() => handleSaveClick(appartment._id)}
                      >Save</button>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <tr key={appartment._id} className="bg-slate-100 hover:bg-slate-200">
                <td className='border-t-2 border-slate-50 p-1 text-center'>
                  <StarIcon
                    className={"w-5 cursor-pointer m-auto " + (favoriteIds.includes(appartment._id) && "fill-yellow-400")}
                    onClick={() => handleFavoriteClick(appartment)}
                  />
                </td>
                <td className='border-t-2 border-slate-50 p-1 text-right'>{appartment.city}</td>
                <td className='border-t-2 border-slate-50 p-1 text-center'>{appartment.price}</td>
                <td className='border-t-2 border-slate-50 p-1 text-center'>{appartment.size}</td>
                <td className='border-t-2 border-slate-50 p-1 text-center'>{appartment.rooms}</td>
                <td className='border-t-2 border-slate-50 p-1 text-center'>{appartment.floor}</td>
                <td className='border-t-2 border-slate-50 p-1 text-center'>
                  <div className="flex justify-evenly">
                    <MapPinIcon
                      className="w-5 cursor-pointer"
                      onClick={() => handleMapClick(appartment.city)}
                    />
                    <PencilSquareIcon
                      className="w-5 cursor-pointer"
                      onClick={() => handleEditClick(appartment._id)}
                    />
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Table;