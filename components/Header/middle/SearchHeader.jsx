import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import SvgIcons from "../../icons/SvgIcons";
import {handelPageNavigate, removeQueryParam} from '../../../lib/handelPageNavigate';
import { useEffect, useRef } from "react";

function SearchHeader() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchRef = useRef();

  const handelSubmot = () => {
    if(!search) {
      removeQueryParam( 'search', router );
      return;
    }
    handelPageNavigate( 'search', search, router, false );
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    
  }

  console.log( );

  useEffect(() => {
    const { search: searchQuery } = router.query;
    setSearch( searchQuery );
  }, [router.query])

  return (
    <div className="basis-[60%] relative">
      <input
        onChange={( e ) => setSearch( e.target.value )}
        // value={search}
        className="w-full border-2 border-gray-400 p-1 pl-6 rounded-full outline-none"
        type="text"
        placeholder="im looking for..."
        ref={searchRef}
      />
      <div onClick={handelSubmot} className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer">
        <SvgIcons
          path={
            "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          }
        />
      </div>
    </div>
  );
}

export default SearchHeader;
