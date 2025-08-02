import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../Components/Card/Card';
import Slider from 'react-slick';
import { cartContext } from './Context/CartContext';
import { authContext } from './Context/AuthContext';
import Loading from '../loading/Loading';

export default function ProductDetails() {
  let [product, setProduct] = useState(null);
  let [related, setRelated] = useState(null);
  let { addProductToCart } = useContext(cartContext);
  let { token } = useContext(authContext);
  let { id } = useParams();
  let navigate = useNavigate();  

 
 
   var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  async function getProductDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
        headers: { token },
      });
      getRelatedProducts(data.data.category._id);
      setProduct(data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`, {
        headers: { token },
      });
      setRelated(data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getProductDetails();
    }
  }, [id, token, navigate]);

  if (!product) return <Loading />;

  return (
    <>
      <div className="mt-15 min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12 px-2">
        {/* Minimalist Product Card */}
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-green-200 flex flex-col items-center p-8 relative mb-16">
          <div className="w-full mb-6">
            <Slider {...settings}>
              {product?.images.map((src) => (
                <img key={src} className="w-full h-80 object-contain rounded-2xl bg-gray-50" src={src} alt={product?.title} />
              ))}
            </Slider>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2 line-clamp-2">{product?.title}</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-green-500 text-2xl font-extrabold">{product?.price} EGP</span>
            {product?.priceAfterDiscount && (
              <span className="text-gray-400 line-through text-lg">{product?.priceAfterDiscount} EGP</span>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{product?.category?.name}</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{product?.brand?.name}</span>
          </div>
          <p className="text-gray-600 text-base text-center mb-4 line-clamp-4">{product?.description}</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm font-medium text-green-600">{product?.quantity > 0 ? 'In stock' : 'Out of stock'}</span>
            <span className="text-yellow-500 font-bold">★ {product?.ratingsAverage?.toFixed(1) || '0.0'}</span>
          </div>
          {/* Floating Add to Cart Button */}
          <button
            type="button"
            onClick={() => {
              if (token) {
                addProductToCart(product._id);
              } else {
                navigate('/login');
              }
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90vw] max-w-xs h-14 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 text-lg flex items-center justify-center gap-2 z-50"
            style={{ boxShadow: '0 8px 32px 0 rgba(0,201,81,0.15)' }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14a2 2 0 002-2v-7M10 21a2 2 0 104 0" /></svg>
            Add to cart
          </button>
        </div>
        {/* Related Products */}
        <div className="w-full max-w-6xl mt-2">
          <h2 className="text-green-500 text-2xl font-bold mb-6 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {related?.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}