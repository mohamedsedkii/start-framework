import React, { useContext } from 'react';
import { cartContext } from './Context/CartContext';

export default function CartItem({ item }) {
  const { removeProductFromCart, updateCartProduct } = useContext(cartContext);

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section: Image & Info */}
        <div className="flex items-center gap-4 w-full md:w-2/3">
          <img
          
            src={item?.product.imageCover}
            alt={item?.product.title}
            className="w-40  object-cover rounded-md"
          />
          <div>
            <p className="text-gray-800 font-semibold text-lg">{item?.product.title}</p>
            <p className="text-gray-500 text-sm">{item?.product.category?.name}</p>
            <p className="text-gray-700 text-sm mt-1">
              Price per item: <span className="font-bold">EGP {item?.price}</span>
            </p>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => removeProductFromCart(item.product._id)}
            className="text-red-600 hover:text-red-800 transition"
            title="Remove from cart"
          >
            <svg
              className="w-6 h-6 cursor-pointer"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="text-sm font-bold text-gray-700">Total: EGP {item?.price * item.count}</p>
        </div>
      </div>

      
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => updateCartProduct(item?.count - 1, item.product._id)}
          className="w-7 h-7 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200 transition"
        >
          -
        </button>
        <input
          type="text"
         
          value={item?.count}
          className="w-10 text-center border border-gray-300 rounded-md text-sm font-medium"
        />
        <button
          onClick={() => updateCartProduct(item?.count + 1, item.product._id)}
          className="w-7 h-7 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
