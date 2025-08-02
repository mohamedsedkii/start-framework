import { NavLink } from "react-router-dom";
import {  LogOutIcon, ShoppingCart, SquareMenu, LogInIcon, UserRoundPlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../pages/Context/AuthContext";
import { cartContext } from "../../pages/Context/CartContext";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import toast from "react-hot-toast";

export default function Navbar() {
  let { token, setToken } = useContext(authContext);
  let { cart } = useContext(cartContext);
  let [counter, setCounter] = useState(cart?.numOfCartItems);
  let [isMenuOpen, setIsMenuOpen] = useState(false); // حالة للتحكم في فتح/إغلاق القائمة

  useEffect(() => {
    setCounter(cart?.numOfCartItems);
  }, [cart]);

  function LogOut() {
    toast.success('Logged Out')
    localStorage.removeItem("token");
    setToken(null);
    setIsMenuOpen(false); // إغلاق القائمة عند تسجيل الخروج
  }

  // تبديل حالة القائمة عند النقر على أيقونة SquareMenu
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // إغلاق القائمة عند النقر على رابط
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="bg-gray-100 fixed top-0 left-0 w-full z-50">
      <nav>
        <div className="bg-gray-100 container mx-auto flex justify-between items-center p-3 h-18">
          <div className="flex space-x-3 items-center">
            <ShoppingCart className="text-green-500" />
            <h2 className="font-bold text-2xl">FreshCart</h2>
          </div>

          {/* قائمة التنقل للشاشات الكبيرة */}
          {token ? (
            <div>
              <ul className="hidden lg:flex justify-center items-center space-x-2">
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? "activeLink"
                        : "text-xl afterEffect text-[#717885] hover:text-green-500 p-1 hover:rounded-xl"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    className={({ isActive }) =>
                      isActive
                        ? "activeLink"
                        : "text-xl afterEffect text-[#717885] hover:text-green-500 p-1 hover:rounded-xl"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "activeLink"
                        : "text-xl afterEffect text-[#717885] hover:text-green-500 p-1 hover:rounded-xl"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) =>
                      isActive
                        ? "activeLink"
                        : "text-xl afterEffect text-[#717885] hover:text-green-500 p-1 hover:rounded-xl"
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allOrders"
                    className={({ isActive }) =>
                      isActive
                        ? "activeLink"
                        : "text-xl afterEffect text-[#717885] hover:text-green-500 p-1 hover:rounded-xl"
                    }
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}

          {/* أيقونة القائمة للشاشات الصغيرة */}
          <SquareMenu
            className="lg:hidden animate-mohamed cursor-pointer"
            onClick={toggleMenu}
          />

          {/* روابط تسجيل الدخول/التسجيل أو الأيقونات الاجتماعية وتسجيل الخروج */}
          {!token ? (
            <ul className="hidden lg:flex justify-between items-center py-2 px-2 space-x-4 text-[#717885]">
              <li className="text-xl hover:text-green-500 hover:scale-115 hover:transition-all duration-500 hover:font-bold">
                <NavLink to="/login">Login <LogInIcon className="size-5 ms-4" /></NavLink>
              </li>
              <li className="text-xl hover:text-green-500 hover:scale-115 hover:transition-all duration-500 hover:font-bold">
                <NavLink to="/register">Register     <UserRoundPlus className="size-5 ms-6" /> </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="relative hidden lg:flex justify-between items-center space-x-3">
              <li className="text-xl afterEffect text-[#717885] hover:text-green-500 p-1 hover:rounded-xl">
                <NavLink to="/Cart">
                  <ShoppingCart className="text-green-500" />
                </NavLink>
              </li>
              <div className="text-white font-extrabold size-6 absolute -top-3 -left-3 text-center rounded-full bg-green-300">
                {cart?.numOfCartItems}
              </div>
              <li className="text-blue-600 text-xl cursor-pointer">
                <FaFacebook />
              </li>
              <li className="text-pink-600 text-xl cursor-pointer">
                <RiInstagramLine />
              </li>
              <li className="text-blue-600 text-xl cursor-pointer">
                <BsTwitter />
              </li>
              <li className="text-blue-600 text-xl cursor-pointer">
                <FaLinkedin />
              </li>
              <li
                className="cursor-pointer text-[#717885] text-xl hover:text-green-500 hover:scale-115 hover:transition-all duration-500 hover:font-bold"
                onClick={LogOut}
              >
                <span>
                  LogOut
                  <LogOutIcon className="size-5 ms-6" />
                </span>
              </li>
            </ul>
          )}
        </div>

        {/* قائمة التنقل للشاشات الصغيرة (تظهر عند النقر على SquareMenu) */}
        <div
          className={`lg:hidden fixed top-20  w-52 bg-gray-100 shadow-lg h-full transform ${
            isMenuOpen ? "translate-x-0" : "translate-y-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <ul className="flex flex-col space-y-4 p-4">
            {token ? (
              <>
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allOrders"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Cart"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Cart ({cart?.numOfCartItems || 0})
                  </NavLink>
                </li>
                <li className="flex space-x-4">
                  <a href="#" className="text-blue-600 text-xl">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-pink-600 text-xl">
                    <RiInstagramLine />
                  </a>
                  <a href="#" className="text-blue-600 text-xl">
                    <BsTwitter />
                  </a>
                  <a href="#" className="text-blue-600 text-xl">
                    <FaLinkedin />
                  </a>
                </li>
                <li
                  className="text-xl text-[#717885] hover:text-green-500 cursor-pointer"
                  onClick={LogOut}
                >
                  LogOut
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold"
                        : "text-xl text-[#717885] hover:text-green-500"
                    }
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* طبقة خلفية لإغلاق القائمة عند النقر خارجها */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}
      </nav>
    </div>
  );
}