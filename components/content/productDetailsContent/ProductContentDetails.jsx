import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToCartOtherWay } from '../../../redux/getData/SliceProduct';
import { toast } from "react-toastify";

function ProductContentDetails({
  item,
  item: {
    title,
    price,
    category,
    brand,
    color,
    description,
    rating: { rate, count },
    inStock,
    id,
    qty
  },
}) {

  const { product: { products }  } = useSelector( state => state );
  const dispatch = useDispatch();
  // existITem here From SelectBox For Choice
  const existItem = products.find( el => el.id === id );
  console.log(existItem)
  const handlerAddToCart = (e, item) => {
    e.preventDefault();
    const existItem = products.find( el => el.id === id );
    const quantity = existItem ? existItem.qty + 1 : 1;

      if (inStock < quantity) {
        toast.warning("Sorry, Product Is out of stock !", { autoClose: 800 });
        return;
      }
        dispatch( addToCart( { ...item, qty: quantity } ) );

  }


  const handelUpdateQtySelectBox = (qty, item) => {
    const existItem = products.find( el => el.id === id );
    const quantity = existItem ? existItem.qty + 1 : 1;
    if (inStock < quantity) {
      toast.warning("Sorry, Product Is out of stock !", { autoClose: 800 });
      return;
    }
        dispatch( addToCartOtherWay( { ...item, qty } ) );
  }




  return (
    <div className="col-span-2 pt-6 px-4 capitalize">
      {/* First Div */}
      <div className="mb-8">
        <h3>{title}</h3>
        <b className="flex">${price}</b>
        <p className="text-yellow-400">
          &#9733;&#9733;&#9733;&#9733;{" "}
          <span className="text-black">(100+ reviews)</span>
        </p>
      </div>
      {/* second div */}
      <div className="flex flex-col gap-4">
      <p>
        color: <span>{color}</span>
        </p>
        <p>{description}</p>
      </div>
      {/* third div */}
      <div className="mt-8">
        <label htmlFor="">qty</label>
        <select value={existItem?.qty}  onChange={(e) => handelUpdateQtySelectBox(Number(e.target.value), item)} className="ml-4">
          {[...Array(inStock).keys()].map( ( _, index ) => (
            <option key={index} value={index + 1}>{index + 1}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 w-[70%] h-[auto] shadow-lg bg-slate-50 p-4 md:py-4 md:px-8 rounded">
        <div className="flex items-center justify-between">
          <h4>status</h4>
          <p>{inStock > 0 ? 'In Stock' : 'Unavailable'}</p>
        </div>
        <button className="block mt-8 bg-orange-500 w-full h-[35px] hover:bg-orange-400 transition-colors text-white capitalize tracking-wider text-sm" onClick={(e) => handlerAddToCart(e, item)}>add</button>
      </div>
    </div>
  );
}

export default ProductContentDetails;
