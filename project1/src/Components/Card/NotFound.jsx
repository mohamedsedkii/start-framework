import React from 'react'
import Error from '../../imges/error.svg'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
   <div className="container mx-auto mt-6 flex justify-around items-center">
    <div>
     <h1 className="text-4xl mb-3">Something’s wrong here…</h1>
     <p className="text-gray-500">We can’t find the page you’re looking for.</p>
     <p className="text-gray-500">Check out our help center or head back to home.</p>
     <div className="space-x-6 mt-6">
        <button className="bg-gray-800 text-white py-2 px-4 rounded-xl font-bold cursor-pointer hover:bg-gray-700 hover:transition-all duration-500">Help Center</button>
        <Link to={'/home'}>        <button className="bg-green-500 text-white py-2 px-4 rounded-xl font-bold cursor-pointer hover:bg-green-700 hover:transition-all duration-500">Back To Home</button>
        </Link>    
    </div>
    </div>
     <div className=""> 
      <img src={Error} alt="" srcset="" />
    </div>
   </div>
  )
}
