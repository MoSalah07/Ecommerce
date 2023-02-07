import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handelPageNavigate, removeQueryParam } from "../../lib/handelPageNavigate";
import TitleAside from "./TitleAside";

function Price() {
  const [minPrice, setMinPrice] = useState( '' );
  const [maxPrice, setMaxPrice] = useState( '' );
  const router = useRouter();

  const handelNavigatePrice = (min, max) => {
    if(minPrice === '' || maxPrice === '') {
      setMinPrice( '' );
      setMaxPrice( '' );
      removeQueryParam( 'price', router );
      return;
    }

    if ( min < 0 || max < 0 || Number( min ) > Number( max ) || min === '' || max === '' ) return;

    handelPageNavigate('price', formatPrice(min, max), router)

  }


  const formatPrice = (min, max) => {
    const priceRange = `${ min }-${ max }`;
    return priceRange;
  }

  useEffect(() => {
    if ( router.query.price === undefined ) return;
    const range = router.query.price.split( '-' );
    const [min, max] = range;
    setMaxPrice( max );
    setMinPrice( min );
  }, [router.query.price])


  return (
    <div className="mt-8">
      <TitleAside title="Price" />
      <div className="w-full flex items-center gap-4 mt-4">
        <div>
          <label htmlFor="min">min</label>
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-[120px] outline-none" type="number" id='min'/>
        </div>
        <div>
          <label htmlFor="min">max</label>
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-[120px] outline-none" type="number" id='max'/>
        </div>
      </div>
      <button onClick={() => handelNavigatePrice(minPrice, maxPrice)} className="w-full text-blue-500 mt-4 p-1 rounded-full capitalize border-[1px] border-blue-500 transition-colors hover:bg-blue-500 hover:text-white">
        filter
      </button>
    </div>
  );
}

export default Price;
