import React, { useContext, useEffect } from 'react';
import { cartContext } from './Context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { cart, getCartProduct, clearUserCart } = useContext(cartContext);

  useEffect(() => {
    getCartProduct();
  }, []); 

  return (
    <div className="min-h-screen bg-gray-50 mt-15 py-10 px-4 md:px-14">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Left Side - Cart Items */}
        <div className="col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <div className="space-y-4">
            {cart?.data?.products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Right Side - Summary */}
        <div className="bg-white shadow-lg rounded-2xl mt-14 p-6 h-96 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
            <button  onClick={clearUserCart}
            className=" cursor-pointer text-white bg-red-400 rounded-xl w-fit py-2 px-5 hover:bg-red-500 ">
            Clear All
            </button>
          </div>

          <div className="space-y-4 text-gray-700 text-sm">
            <div className="flex justify-between">
              <p>Subtotal ({cart?.data?.products?.length || 0} items)</p>
              <p className="font-bold">EGP {cart?.data?.totalCartPrice || '0.00'}</p>
            </div>

            <div className="flex justify-between">
              <p>Freight</p>
              <div className="text-right">
                <p className="font-bold">EGP 3.90</p>
                <p className="text-gray-400 text-xs">Arrives on Jul 16</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p>Discount Coupon</p>
              <a href="#" className="text-blue-500 underline text-sm">Add</a>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <p>Total</p>
              <p>EGP {cart?.data?.totalCartPrice}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to={'/checkOut'}>
            <button className="w-full bg-blue-600  text-white py-2 rounded-md text-sm font-medium shadow-md transition hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600 hover:transition-all hover:duration-700 ">
              CHECK OUT 
            </button>
            </Link>
            <Link to={'/product'}>
            <button className="border border-gray-300 w-full bg-white text-gray-700 py-2 rounded-md text-sm font-medium shadow-sm  transition hover:bg-blue-600 hover:text-white   hover:transition-all hover:duration-700" >
              ADD MORE PRODUCTS
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
