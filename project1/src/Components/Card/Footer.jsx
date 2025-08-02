import React from 'react'
import amazon from '../../imges/amazon-pay.png'
import payball from '../../imges/paypal.png'
import master from '../../imges/mastercard.webp'
import american from '../../imges/American-Express-Color.png'
import appStore from '../../imges/get-apple-store.png'
import googlePlay from '../../imges/get-google-play.png'

export default function Footer() {
  return (
    <div className="bg-slate-100 py-10 mt-20 w-full">
      <div className="max-w-[1200px] mx-auto px-2 sm:px-4 ">
        {/* العنوان والوصف */}
        <div>
          <h3 className="text-2xl font-semibold">Get The FreshCart App</h3>
          <p className="text-slate-500">We will send you a link, open it on your phone to download the app.</p>
        </div>

        {/* الإيميل والزر */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
          <input
            type="text"
            placeholder="Email..."
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2 flex-1 focus:outline-none w-full sm:w-auto"
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto">
            Share App Link
          </button>
        </div>

        {/* قسم وسائل الدفع ومتاجر التطبيقات */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-8 gap-6">
          {/* وسائل الدفع */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <p className="w-full text-center lg:text-left font-medium">Payment Partners</p>
            <img className="w-20" src={amazon} alt="amazon" />
            <img className="w-20" src={payball} alt="paypal" />
            <img className="w-20" src={master} alt="mastercard" />
            <img className="w-20" src={american} alt="american express" />
          </div>

          {/* تطبيقات الهواتف */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3">
            <h6 className="font-medium w-full text-center lg:text-left">Get deliveries with FreshCart</h6>
            <img className="w-32" src={appStore} alt="App Store" />
            <img className="w-32" src={googlePlay} alt="Google Play" />
          </div>
        </div>
      </div>
    </div>
  )
}
