import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from './Context/AuthContext'
import Loading from '../loading/Loading'
import { ShoppingCart } from 'lucide-react'

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  let [loading,setLoading]=useState(false)

  const { token } = useContext(authContext)
  const { id } = jwtDecode(token)

  async function getAllOrders() {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      console.log(data)
      setOrders(data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <>
      <div className="container mx-auto px-2 py-10 min-h-screen mt-16">
        <h2 className="text-4xl font-extrabold text-center text-green-500 mb-10 tracking-tight drop-shadow-lg">All Orders</h2>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/80 rounded-2xl shadow-inner">
            <ShoppingCart className="w-20 h-20 text-green-200 mb-6 animate-bounce" />
            <p className="text-2xl text-gray-400 font-semibold">You have no orders yet.</p>
            <p className="text-md text-gray-400 mt-2">Start shopping and your orders will appear here!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <div
                key={order.id}
                className="relative bg-white border-l-8 border-green-500 rounded-2xl shadow-lg p-8 flex flex-col gap-6 hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Order Summary */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-green-500" />
                    <span className="text-xl font-bold text-green-600">Order #{order.id}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-gray-600 text-base mt-2 md:mt-0">
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full font-semibold">{order.paymentMethodType}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{order.shippingAddress?.city || 'N/A'}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{order.shippingAddress?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-green-600">Total: {order.totalOrderPrice} EGP</span>
                  </div>
                </div>
                {/* Product List */}
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-6 min-w-[320px]">
                    {order.cartItems.map((product) => (
                      <div
                        key={product.product.id}
                        className="flex flex-col items-center bg-gray-50 rounded-xl p-4 shadow-sm min-w-[180px] max-w-[200px] border border-green-100 hover:scale-105 transition-transform duration-200"
                      >
                        <img
                          className="w-24 h-24 object-cover rounded-lg mb-2 border border-green-100"
                          src={product.product.imageCover}
                          alt={product.product.title || ''}
                        />
                        <div className="text-center">
                          <p className="font-semibold text-gray-800 truncate max-w-[8rem]">{product.product.title || 'Product'}</p>
                          <p className="text-green-500 font-bold text-lg">{product.price} EGP</p>
                          <p className="text-gray-500 text-sm">Qty: <span className="text-green-600 font-semibold">{product.count}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
