import axios from 'axios';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function togglePasswordTwo() {
    setShowPasswordTwo(!showPasswordTwo);
  }

  async function sendData(formValues) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues);
      if (data.message === "success") {
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during registration";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const validation = yup.object().shape({
    name: yup.string().min(3, 'Too short!').max(10, 'Name maxlength is 10').required('Name is required'),
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup.string().matches(/^[A-Za-z0-9]{6,}$/, 'Password must be at least 6 characters and can include letters and numbers').required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Re-password is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid Phone Number').required('Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: validation,
    onSubmit: sendData,
  });

  return (
    <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="mt-25 max-w-xl mx-auto bg-white  shadow-lg p-6 sm:p-8 rounded-xl my-10"
        onSubmit={formik.handleSubmit}
      >
        <h4 className="text-green-600 text-2xl sm:text-3xl font-bold pb-5 text-center">Register Now:</h4>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300  text-sm rounded-lg p-2 dark:bg-gray-700 dark:text-white"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 dark:border-gray-600 text-sm rounded-lg p-2 dark:bg-gray-700 dark:text-white"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 dark:border-gray-600 text-sm rounded-lg p-2 dark:bg-gray-700 dark:text-white"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Re-password */}
        <div className="mb-4 relative">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Re-password:
          </label>
          <input
            type={showPasswordTwo ? 'text' : 'password'}
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 dark:border-gray-600 text-sm rounded-lg p-2 dark:bg-gray-700 dark:text-white"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={togglePasswordTwo}
          >
            {showPasswordTwo ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 dark:border-gray-600 text-sm rounded-lg p-2 dark:bg-gray-700 dark:text-white"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 text-white text-sm rounded-xl bg-green-500 hover:bg-green-600 transition duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}
