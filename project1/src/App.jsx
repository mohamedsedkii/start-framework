
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Card from './components/Card/card'
import Home from './Components/Card/Start'
import About from './Components/Card/About'
import Gallary from './Components/Card/Profolio'
import Navbar from './Components/Card/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Product from './Components/Card/Contact'
import Start from './Components/Card/Start'
import Profolio from './Components/Card/Profolio'
import Contact from './Components/Card/Contact'

function App() {


let Router= createBrowserRouter([
    {path:'',element:<Layout/>, children:[ 
      {path:'start framework',element:<Start/>},
      {path:'/about',element:<About/>},
      {path:'/profolio',element:<Profolio/>},
      {path:'/contact',element:<Contact/>}]}
])

  return (
    <>
      <RouterProvider router={Router} />


    </>
  );
}

export default App
