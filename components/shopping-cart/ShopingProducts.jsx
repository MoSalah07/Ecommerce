import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import convertCurrency  from '../../lib/convertCurrency';

function ShopingProducts({product, handelDeleteToCart}) {
    const [converPrice, setConvertPrice] = useState( '' );
    const { currency: { currency } } = useSelector( state => state );
  // console.log(product)
    const handelCurrency = async (amount, currency) => {
        const price = await convertCurrency(amount, currency);
        setConvertPrice(price);
      };

    useEffect(() => {
        handelCurrency( product.price, currency );
    }, [currency])

  return (
    <li key={product.id} className="flex py-6">
    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <Image
        src={product.image}
        alt={product.title}
        layout='responsive'
        width={30}
        height={30}
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a href={product.href}>
              {product.name}
            </a>
          </h3>
                      <p className="ml-4">
                          {/* {product.price} */}
                          {converPrice}
                      </p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {product.color}
        </p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <p className="text-gray-500">
          Qty {product.qty}
        </p>

        <div className="flex">
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => handelDeleteToCart(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
  )
}

export default ShopingProducts