import React, { useEffect, useState } from 'react';
import Table from "../common/Table";
import { getAllAppartments, } from '../../api/ApiHandler';
import Scrapebar from '../common/Scrapebar';

const Home = () => {
  const [appartments, setAppartments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const refreshSelf = () => {
    setRefresh(prev => !prev);
  }

  const fetchAllAppartments = () => {
    getAllAppartments()
      .then(res => {
        setAppartments(res.data.number_of_items);
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    fetchAllAppartments();
  }, [refresh])

  return (
    <div className="">
      <Scrapebar fetchAllAppartments={refreshSelf} />
      <Table appartments={appartments} refetchAllAppartments={refreshSelf} />
    </div>
  );
};

export default Home;