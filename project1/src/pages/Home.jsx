import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import imgSlider7 from "../../src/imges/photo1 (1).jpg";
import imgSlider8 from "../../src/imges/photo2.jpg";
import imgSlider9 from "../../src/imges/photo3.jpg";

import Card from '../Components/Card/Card';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Slider settings for categories
  const settingsCategories = {
  dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Fetch categories
  async function getCategories() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch products
  async function getProduct() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-26">

      {/* Top Banner Images */}
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-2/3 h-[300px] lg:h-[600px]">
          <img className="w-full h-full object-cover rounded-lg" src={imgSlider7} />
        </div>
        <div className="w-full lg:w-1/3 h-[300px] lg:h-[600px] flex flex-col gap-2">
          <div className="h-1/2">
            <img className="w-full h-full object-cover rounded-lg" src={imgSlider8} />
          </div>
          <div className="h-1/2">
            <img className="w-full h-full object-cover rounded-lg" src={imgSlider9} />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <h1 className="mt-12 text-4xl font-bold text-green-500 text-center">Featured Categories</h1>
      <div className="mt-6">
        <Slider {...settingsCategories}>
          {categories.map((category) => (
            <div key={category._id} className="px-2">
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 w-full">
                <div className="w-full h-56 sm:h-64 md:h-72">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-center bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* All Products Section */}
      <h1 className="text-3xl font-bold text-center text-green-500 mt-12">All Products</h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 16).map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
