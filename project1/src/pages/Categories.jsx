import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../loading/Loading';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loaading, setLoaading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function getCategories() {
    try {
      setLoaading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  // إغلاق المودال عند الضغط في أي مكان خارج المودال
  function handleOverlayClick(e) {
    if (e.target.id === 'modalOverlay') {
      setSelectedCategory(null);
    }
  }

  return (
    <>
      {loaading ? (
        <Loading />
      ) : (
        <div className="container mx-auto py-24 px-4">
          <h2 className="text-4xl font-extrabold text-center text-green-500 tracking-tight drop-shadow-lg">
            All Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-72 object-fill mx-auto"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 group-hover:text-green-500">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ المودال */}
      {selectedCategory && (
        <div
          id="modalOverlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/30 bg-opacity-60 flex items-center justify-center z-50"
        >
          <div className="relative bg-white rounded-lg overflow-hidden w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-5">
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-2 right-2 text-red-500 text-3xl font-bold hover:text-red-700"
            >
              &times;
            </button>

            {/* صورة واسم الكاتيجوري */}
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="h-72 object-fill mx-auto"
            />
            <h3 className="text-2xl font-bold text-center text-green-600">{selectedCategory.name}</h3>
          </div>
        </div>
      )}
    </>
  );
}
