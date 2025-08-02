import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../loading/Loading';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null); // ✅ brand المختارة

  async function getBrands() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-4xl font-extrabold text-center text-green-500 mt-24 tracking-tight drop-shadow-lg">
            All Brands
          </h2>

          <div className="bg-white mt-5 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* ✅ grid للبراندات */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {brands.map((brand) => (
                  <div
                    key={brand._id}
                    onClick={() => setSelectedBrand(brand)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <img
                      className="size-36 bg-white rounded-full shadow-md p-2 object-contain group-hover:scale-110 group-hover:-translate-y-2 transition duration-300"
                      src={brand.image}
                      alt={brand.name}
                    />
                    <p className="mt-2 text-center text-gray-700 font-medium">{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ Modal */}
          {selectedBrand && (
            <div
              className="fixed inset-0 bg-black/15 bg-opacity-60 flex justify-center items-center z-50"
              onClick={() => setSelectedBrand(null)} 
            >
              <div
                className="bg-white rounded-lg p-6 w-[90%] max-w-md text-center relative"
                onClick={(e) => e.stopPropagation()} 
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl font-bold"
                  onClick={() => setSelectedBrand(null)}
                >
                  &times;
                </button>
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-40 h-40 mx-auto object-contain mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-800">{selectedBrand.name}</h3>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
