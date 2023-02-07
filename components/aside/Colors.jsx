import React, { useState, useEffect, useRef } from "react";
import TitleAside from "./TitleAside";
import { useRouter } from "next/router";
import { handelPageNavigate,  removeQueryParam} from '../../lib/handelPageNavigate';

const colors = ["red", "green", "blue", "gold", "brown", "black"];

function Colors({colors: allColors}) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState( [] );
  const colorRef = useRef( 0 );

  const handelMoveColors = (color) => {
    colorRef.current = 1;
    if (selectedColor.includes(color)) {
      const unCheckedColor = selectedColor.filter( ( el ) => el !== color );
      setSelectedColor( unCheckedColor );
      return;
    }
    setSelectedColor( ( prev ) => [...prev, color] );
  }



  useEffect(() => {
    if ( !colorRef.current ) return;
    if (selectedColor.length === 0) {
      removeQueryParam( 'colors', router );
    } else {
      handelPageNavigate( 'colors', selectedColor.join( ',' ), router );
    }


  }, [selectedColor] );
  
  useEffect(() => {
    if ( router.query.colors === undefined ) return;
    const colorQuery = router.query.colors.split( ',' );
    setSelectedColor( colorQuery );
  }, [])

  return ( 
    <div className="mt-8">
      <TitleAside title="Colors" />
      <ul className="flex flex-col gap-2 mt-4">
        {colors &&
          colors.map((color, index) => (
            <li
              className="flex items-center gap-2 capitalize cursor-pointer"
              key={index}
            >
              <input
                className="cursor-pointer"
                onChange={() => handelMoveColors(color)}
                type="checkbox"
                id={color}
                checked={selectedColor.includes(color)}
              />

              <span
                style={{
                  backgroundColor: color,
                  width: "12px",
                  height: "12px",
                }}
                className="block rounded-full "
              ></span>
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Colors;
