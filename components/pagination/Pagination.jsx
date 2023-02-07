import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function Pagination() {
  const counter = [1, 2, 3, 4];
  
  const [numOfPages, setNumOfPages] = useState([]);
  const router = useRouter();

  const getAllData = async () => {
    const { data } = await axios.get( `/api/products` );
    // console.log( data );
  }


  useEffect(() => {
    getAllData();
  }, []);

  return (
      <div className='flex items-center justify-between w-[200px] mx-auto mt-6'>
          {counter.map( ( el ) => (
              <p className='border-[.5px] border-grey-500 py-1 px-3 cursor-pointer text-blue-500' key={el}>{el}</p>
        ))}
    </div>
  )
}

export default Pagination