import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrency } from "../../redux/getData/sliceCurrency";

function DropHeader({ item, styleLeft = "0" }) {
  // const [selectedList, setSelectedList] = useState( 'USD' );
  const dispatch = useDispatch();

  const handelSelected = (e) => {
    // setSelectedList( );
    dispatch(getCurrency(e.target.textContent));
    // console.log(selectedList)
  };

  return (
    <ul
      className={`absolute  left-[${styleLeft}] top-[25px] bg-slate-300 p-4 rounded-lg z-50 flex flex-col gap-2`}
    >
      {item.map((el) => (
        <li onClick={handelSelected} className="font-bold" key={el}>
          {el}
        </li>
      ))}
    </ul>
  );
}

export default DropHeader;
