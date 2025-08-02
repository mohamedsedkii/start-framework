import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Components/Card/Navbar';
import Card from './Components/Card/Card';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Components/Card/Layout';
import Product from './pages/Product';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoutes from './pages/Protected/ProtectedRoutes';
import AuthContextProvider from './pages/Context/AuthContext';
import ProtectedLogin from './pages/Protected/ProtectedLogin';
import ForgetPassword from './pages/ForgetPassword';
import ProductDetails from './pages/ProductDetails';
import CartContextProvider from './pages/Context/CartContext';
import Cart from './pages/Cart';
import NotFound from './Components/Card/NotFound';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import CheckOut from './pages/CheckOut';
import AllOrders from './pages/AllOrders';
import { Toaster } from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function App() {




 

    let routers=createBrowserRouter([
      {path:"/",element:<Layout/>,children:[
        { index: true, element: <Login /> },
        {path:"*",element:<NotFound/>},
        {path:"/home",element:<ProtectedRoutes>
          <Home/>
        </ProtectedRoutes>},
        {path:"/product",element:<ProtectedRoutes>
          <Product/>
        </ProtectedRoutes>
        },
{path:"/productDetails/:id", element:
  <ProtectedRoutes>
    <ProductDetails />
  </ProtectedRoutes>
},        
        {path:"/categories",element:<ProtectedRoutes>
          <Categories/>
        </ProtectedRoutes>},
        {path:"/brands",element:<ProtectedRoutes>
          <Brands/>
        </ProtectedRoutes>
        },
        {path:"/allOrders",element:<ProtectedRoutes>
          <AllOrders/>
        </ProtectedRoutes>},
        {path:"/cart",element:<ProtectedRoutes>
          <Cart/>
        </ProtectedRoutes>},
         {path:"/checkout",element:<ProtectedRoutes>
          <CheckOut/>
        </ProtectedRoutes>},
        
        
        

        {path:"/register",element:<ProtectedLogin>
          <Register/>
        </ProtectedLogin>},
        {path:"/login",element:<ProtectedLogin>
          <Login/>
        </ProtectedLogin>},
        {path:"/forgetPassword",element:<ForgetPassword/>},
        {path:"/resetPassword",element:<ResetPassword/>},
        {path:"/newPassword",element:<NewPassword/>},


      ]}
    ])


  return (
    <>



<AuthContextProvider>
  <CartContextProvider>
    <Toaster
      duration={7000}
      position="top-center"
      toastOptions={{
        style: {
          background: '#00C88C',
          color: 'white',
        },
      }}
    />
    <RouterProvider router={routers} />
  </CartContextProvider>
</AuthContextProvider>

   </>
  )
};
