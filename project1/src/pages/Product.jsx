import React, { useEffect, useState } from 'react';
import Card from '../Components/Card/Card';
import axios from 'axios';
import Loading from '../loading/Loading';

export default function Product() {
  let [products, setProducts] = useState([]);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState(false);
  let [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  let [totalPages, setTotalPages] = useState(0); // عدد الصفحات من الـ API

  async function getProduct(page) {
    try {
      setLoader(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
      console.log(data);
      setProducts(data.data ); 
      setTotalPages(data.metadata?.numberOfPages || 0); 
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getProduct(currentPage);
  }, [currentPage]); // يشتغل لما currentPage يتغير

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
    
    
        <h2 className="text-4xl font-extrabold text-center text-green-500 mt-24  tracking-tight drop-shadow-lg">All Products</h2>
    <div className="container mx-auto mt-7">
      {loader ? (
        <Loading />
      ) : error ? (
        <h1 className="text-5xl text-red-500 text-center">The Products Is Not Found</h1>
      ) : (
        <>
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5">
            {products.map((item) => (
              <Card key={item._id} item={item} /> 
            ))}
          </div>
          {/* أزرار التنقل */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-green-400 hover:text-white hover:transition-all duration-500"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-green-400 hover:text-white hover:transition-all duration-500"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}