import axios from 'axios'
import { Formik, useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { authContext } from './Context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  let navigate=useNavigate();
  let [showPassword,setShowPassword]=useState("password")
  let {setToken}=useContext(authContext)
  


  async function sendDataToLogin(formValues){

   let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formValues)
   
   toast.success('welcome to Fresh Cart')
   if(data.message==="success"){
    navigate('/home')

   }
   localStorage.setItem("token",data.token)
   setToken(data.token)
  }

  //اظهار او اخفاء الباسورد
  function togglePassword(){
    setShowPassword(showPassword === 'password'? 'text': 'password' )
  }
   

  let validationLogin=yup.object().shape({
    email:yup.string().email('email must be a valid email').required('Email is required'),
    password:yup.string().matches(/^[A-Z][a-z]{5,10}$/ ,'invalid password').required('Password is required'),
      
    })




  let formikLogin=useFormik({
    initialValues:{
    email:"",
    password:"",
   },
   validationSchema:validationLogin,
   onSubmit:sendDataToLogin

  })



  return (
    
<>
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <form
      className=" w-full max-w-md bg-white p-6 rounded-xl shadow-md"
      onSubmit={formikLogin.handleSubmit}
    >
      <h4 className="text-green-600 text-2xl font-bold pb-3 text-center">
        Login Now:
      </h4>

      {/* Email */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Your email:
        </label>
        <input
          type="email"
          name="email"
          value={formikLogin.values.email}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none"
          required
        />
        {formikLogin.touched.email && formikLogin.errors.email && (
          <div className="text-red-500 text-sm">{formikLogin.errors.email}</div>
        )}
      </div>

      {/* Password */}
      <div className="mb-3 relative">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Your password:
        </label>
        <input
          type={showPassword}
          name="password"
          value={formikLogin.values.password}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 focus:outline-none"
          required
        />
        {formikLogin.touched.password && formikLogin.errors.password && (
          <div className="text-red-500 text-sm">{formikLogin.errors.password}</div>
        )}

        {/* Eye Icon */}
        <div
          className="absolute top-9 right-3 cursor-pointer text-gray-600"
          onClick={togglePassword}
        >
          {showPassword === 'password' ? <Eye /> : <EyeOff />}
        </div>
      </div>

      {/* Button */}
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </button>
      </div>

      {/* Links */}
      <p className="text-sm text-gray-700 mb-1">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-green-600 font-semibold hover:underline"
        >
          Register Now
        </Link>
      </p>
      <p className="text-sm">
        <Link
          to="/forgetpassword"
          className="text-green-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </p>
    </form>
  </div>
</>

  )
}
