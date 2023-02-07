import React, {useState} from "react";
import TitleAside from "./TitleAside";
import { removeQueryParam, handelPageNavigate, handelQuerySpacing } from '../../lib/handelPageNavigate';
import { useRouter } from 'next/router';
import { useEffect } from "react";

function Brands({brands}) {
  const router = useRouter();
  const [selectBrand, setSelectBrand] = useState('');
  const pageNavigate = (brand) => {
 
    if (selectBrand !== '' && selectBrand === brand) {
      setSelectBrand( '' );
      removeQueryParam( 'brands', router );
      return;
    }
    setSelectBrand( brand );
    handelPageNavigate( 'brand', handelQuerySpacing(brand, 'query'), router );
  }


  useEffect(() => {
    setSelectBrand( handelQuerySpacing( router.query.brand ) );
  }, [router.query.brand]);

  return (
    <div className="mt-8">
      <TitleAside title="Brands" />
      <ul className="mt-4 flex flex-col gap-4 capitalize">


        {brands.map( ( brand, index ) => (
          <li key={index} className='text-sm font-semibold cursor-pointer p-2
          hover:bg-gray-200 transition-colors`' onClick={() => pageNavigate( brand )}>
            {/* <label htmlFor={brand} className='flex items-center gap-2'> */}
              {/* <input type="checkbox" id={brand} onClick={() => pageNavigate( brand )}  /> */}
              <span>{brand}</span>
            {/* </label> */}
          </li>
        ))}


      </ul>
    </div>
  );
}

export default Brands;
