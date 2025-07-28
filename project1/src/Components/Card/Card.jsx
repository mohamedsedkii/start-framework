
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Search, SortAsc } from "lucide-react"
import Loading from "./Loading"

export default function Card() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("default")
  const [loading, setLoading] = useState(true)

  async function getProducts() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://fakestoreapi.com/products")
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //  البحث والترتيب
  useEffect(() => {
    let filtered = [...products]

    //  البحث
    if (searchTerm) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    //  الترتيب
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // الترتيب الافتراضي 
        filtered.sort((a, b) => a.id - b.id)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, sortOption])

  useEffect(() => {
    getProducts()
  }, [])

  //  مسح البحث
  const clearSearch = () => {
    setSearchTerm("")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center  mt-32 h-64">
     <Loading className='size-24'/>
      </div>
    )
  }

  return (
    <div className="dark:bg-black dark:text-white p-6">
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         placeholder-gray-500 dark:placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SortAsc className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         cursor-pointer min-w-[180px]"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A-Z</option>
              <option value="name-z-a">Name: Z-A</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Showing {filteredProducts.length} of {products.length} products
            {searchTerm && (
              <span className="ml-2">
                for "<span className="font-semibold text-blue-600 dark:text-blue-400">{searchTerm}</span>"
              </span>
            )}
          </span>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            {searchTerm ? (
              <>
                <p>No products found for "{searchTerm}"</p>
                <button
                  onClick={clearSearch}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Clear search to see all products
                </button>
              </>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg 
                         transition-all duration-300 rounded-lg bg-white dark:bg-gray-800
                         hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="aspect-square overflow-hidden rounded-md mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {product.title.split(" ").slice(0, 4).join(" ")}
                {product.title.split(" ").length > 4 && "..."}
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">${product.price}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-1">⭐</span>
                  <span>{product.rating?.rate || "N/A"}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 capitalize">{product.category}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
