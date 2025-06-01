import React from 'react'
import Navbar from './Components/Card/Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import LastPage from './Components/Card/LastPage.JSX'

export default function Layout() {
    return (
    <div>
    <Navbar/>
    <Outlet/>
    <LastPage/>
    <Footer/>
    </div>
    )
}
