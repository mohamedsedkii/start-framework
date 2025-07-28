
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"

export default function Product() {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
    const [loading, setLoading] = useState(true)


  async function getProductDetails() {
    setLoading(true)
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`)
      console.log(data)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [id])


    if (loading) {
      return (
        <div className="flex justify-center items-center  mt-32 h-64">
       <Loading />
        </div>
      )
    }

  return (
    <div className="min-w-screen min-h-screen bg-gray-200 dark:bg-gray-800 flex items-center p-5 lg:p-10 overflow-hidden relative transition-colors duration-300">
      <div className="w-full max-w-6xl rounded-xl bg-white dark:bg-gray-900 shadow-xl p-10 lg:p-20 mx-auto text-gray-800 dark:text-gray-200 relative md:text-left transition-colors duration-300">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={product?.image }
                className="w-full relative z-10 rounded-lg"
                alt={product?.title}
              />
              <div className="border-4 border-yellow-200 dark:border-yellow-400 absolute top-10 bottom-10 left-10 right-10 z-0 rounded-lg" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <p className="mb-2 w-1/2 bg-red-500 dark:bg-red-600 rounded-2xl p-2  text-center text-white font-bold uppercase ">
                {product?.category}
              </p>
              <h1 className="font-bold uppercase text-2xl lg:text-3xl mb-5 text-gray-900 dark:text-white leading-tight">
                {product?.title}
              </h1>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {product?.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <span className="font-bold text-4xl lg:text-5xl leading-none text-green-600 dark:text-green-400">
                  $ {product?.price}
                </span>
              </div>
              <div>
                <button className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white hover:shadow-lg transition-all duration-300 rounded-full px-8 lg:px-10 py-3 font-semibold text-lg">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
