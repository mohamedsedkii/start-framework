"use client"

import { Eye, ShoppingCart, Heart, Star, Zap, Sparkles } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cartContext } from "../../pages/Context/CartContext"

export default function ProductCardDarkFixed({ item, theme = "light" }) {
  const { addProductToCart } = useContext(cartContext)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    try {
      await addProductToCart(item._id)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setTimeout(() => setIsLoading(false), 800)
    }
  }

  const toggleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleViewProduct = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Navigating to:", `/productDetails/${item._id}`)
    navigate(`/productDetails/${item._id}`)
  }

  const isDark = theme === "dark"

  return (
    <div
      className={`group relative rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border ${
        isDark
          ? "bg-gray-800 border-gray-700 hover:border-purple-500/50"
          : "bg-white border-gray-100 hover:border-blue-200"
      }`}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isDark
            ? "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
            : "bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80"
        }`}
      ></div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <Sparkles className="absolute top-4 left-1/4 w-4 h-4 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute bottom-1/4 right-6 w-3 h-3 text-blue-400 animate-pulse delay-300" />
        <Sparkles className="absolute top-1/3 right-1/4 w-2 h-2 text-purple-400 animate-pulse delay-700" />
      </div>

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            src={item.imageCover || "/placeholder.svg"}
            alt={item.title}
          />

          {/* Dynamic Gradient Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isDark
                ? "bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                : "bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100"
            }`}
          ></div>
        </div>

        {/* Enhanced Date Badge */}
        <div
          className={`absolute top-4 left-4 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 ${
            isDark
              ? "bg-gray-800/90 text-white border border-gray-600"
              : "bg-white/90 text-gray-800 border border-white/50"
          }`}
        >
          <div className="text-center">
            <span className="block text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              5
            </span>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">Sep</p>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3">
          <button
            onClick={handleViewProduct}
            className={`group/btn backdrop-blur-md p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-125 hover:rotate-12 z-20 ${
              isDark
                ? "bg-gray-800/90 text-white hover:bg-blue-500 border border-gray-600"
                : "bg-white/90 text-gray-800 hover:bg-blue-500 hover:text-white border border-white/50"
            }`}
          >
            <Eye className="w-5 h-5 group-hover/btn:animate-pulse" />
          </button>

          <button
            onClick={toggleLike}
            className={`group/btn backdrop-blur-md p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-125 z-20 ${
              isLiked
                ? "bg-red-500 text-white border border-red-400"
                : isDark
                  ? "bg-gray-800/90 text-white hover:bg-red-500 border border-gray-600"
                  : "bg-white/90 text-gray-800 hover:bg-red-500 hover:text-white border border-white/50"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-current animate-pulse" : ""} group-hover/btn:animate-bounce`}
            />
          </button>
        </div>

        {/* Enhanced Availability Badge */}
        <div className="absolute bottom-4 left-4">
          {item.quantity ? (
            <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              <Zap className="w-4 h-4 mr-1" />
              In Stock
            </div>
          ) : (
            <div className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Out of Stock
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="relative z-10 p-6 space-y-5">
        {/* Product Title with Gradient - Clickable */}
        <h3
          onClick={handleViewProduct}
          className={`text-xl font-bold line-clamp-2 transition-all duration-300 cursor-pointer hover:underline ${
            isDark
              ? "text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent"
              : "text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"
          }`}
        >
          {item.title}
        </h3>

        {/* Enhanced Product Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-300 group-hover:bg-purple-900/50 group-hover:text-purple-300"
                  : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700"
              }`}
            >
              {item.category?.name || "Category"}
            </span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : isDark ? "text-gray-600" : "text-gray-300"}`}
                />
              ))}
              <span className={`text-sm font-medium ml-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>4.5</span>
            </div>
          </div>

          <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Brand:{" "}
            <span className={`${isDark ? "text-gray-300" : "text-gray-700"} font-semibold`}>
              {item.brand?.name || "Unknown"}
            </span>
          </p>
        </div>

        {/* Enhanced Price and Add to Cart */}
        <div
          className={`flex items-center justify-between pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}
        >
          <div className="flex flex-col">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              EGP {item.price}
            </span>
            <span className={`text-sm line-through ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              EGP {(item.price * 1.2).toFixed(0)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!item.quantity || isLoading}
            className={`group/cart relative flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-xl z-20 ${
              !item.quantity
                ? "bg-gray-500 cursor-not-allowed"
                : isLoading
                  ? "bg-blue-400"
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-2xl"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 group-hover/cart:animate-bounce" />
                <span>Add to Cart</span>
              </>
            )}

            {/* Enhanced Button Glow */}
            {!isLoading && item.quantity && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover/cart:opacity-30 transition-opacity duration-300 blur-sm"></div>
            )}
          </button>
        </div>

        {/* Enhanced Quick Stats */}
        <div
          className={`flex items-center justify-between pt-3 text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>✨ Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Enhanced Corner Decorations */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-150"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-150"></div>
    </div>
  )
}
