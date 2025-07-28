
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Moon, ShoppingCart, Sun, Menu, X, Store } from "lucide-react"

export default function Navbar({ toggletheme, theme }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const scrollCheck = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", scrollCheck)
    return () => window.removeEventListener("scroll", scrollCheck)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <nav >
        <div
          className={ `${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          }  container mx-auto flex justify-between items-center p-3 h-16 transition-colors duration-300`}
        >
          
          <div className="flex items-center ">
            <h1
              className={`text-2xl font-bold flex justify-center items-center ${
                theme === "dark" ? "text-white" : "text-gray-800"
              } transition-colors duration-300`}
            > 
              <Store className="m-1" /> Product Store  
            </h1>
          </div>

        

          <ul className="hidden lg:flex justify-between items-center py-2 px-2 space-x-6">
            <Link to={"/login"}>
              <li
                className={`cursor-pointer text-xl ${
                  theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-800 hover:text-red-500"
                } p-1 hover:font-bold hover:transition-all hover:duration-500`}
              >
                Login
              </li>
            </Link>

            <Link to={"/register"}>
              <li
                className={`cursor-pointer text-xl ${
                  theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-800 hover:text-red-500"
                } p-1 hover:font-bold hover:transition-all hover:duration-500`}
              >
                Register
              </li>
            </Link>

           
            <li
              className={`cursor-pointer p-2 rounded-full ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-yellow-400 hover:text-yellow-300"
                  : "hover:bg-gray-200 text-gray-600 hover:text-gray-800"
              } hover:transition-all duration-300`}
              onClick={toggletheme}
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </li>
          </ul>

          <div className="lg:hidden flex items-center space-x-4">
            <button
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-800 text-yellow-400" : "hover:bg-gray-200 text-gray-600"
              } hover:transition-all duration-300`}
              onClick={toggletheme}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              } transition-colors duration-300`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className={`lg:hidden ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            } border-t transition-colors duration-300`}
          >
            <div className="px-4 py-6 space-y-4">
              <div
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-500"
                } hover:font-semibold transition-all duration-300 cursor-pointer py-2`}
              >
                Products
              </div>

              <Link to={"/login"} onClick={() => setIsMobileMenuOpen(false)}>
                <div
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-500"
                  } hover:font-semibold transition-all duration-300 cursor-pointer py-2`}
                >
                  Login
                </div>
              </Link>

              <Link to={"/register"} onClick={() => setIsMobileMenuOpen(false)}>
                <div
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-500"
                  } hover:font-semibold transition-all duration-300 cursor-pointer py-2`}
                >
                  Register
                </div>
              </Link>


            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
