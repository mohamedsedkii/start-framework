import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, UNSAFE_getTurboStreamSingleFetchDataStrategy, useNavigate } from 'react-router-dom';
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

  const validation = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup
      .string().required('Password is required'),
    rePassword: yup.string().required('Re-password is required'),
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
    onSubmit: async (formValues) => {
      setIsLoading(true);
      try {
        if (formik.isValid) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate('/login');
        } else {
          alert('Please fill in all fields correctly.');
        }
      } catch (error) {
        console.error('Registration Error:', error);
        alert('Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
   <section className='min-h-screen flex  bg-white dark:bg-gray-800'>
     <div className="container mx-auto">
      <form className="mt-25 w-md mx-auto shadow-2xl shadow-red-200 bg-gray-100 p-4 rounded-xl" onSubmit={formik.handleSubmit}>
        <h4 className="text-red-500 text-2xl font-bold pb-3">Register Now:</h4>

        <div className="mb-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none"
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-3 relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none"
            required
          />
          <div className="absolute right-2 top-8 cursor-pointer" onClick={togglePassword}>
            {showPassword ? <EyeOff /> : <Eye />}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="mb-3 relative">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">
            Re-password:
          </label>
          <input
            type={showPasswordTwo ? 'text' : 'password'}
            id="rePassword"
            value={formik.values.rePassword}
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none"
            required
          />
          <div className="absolute right-2 top-8 cursor-pointer" onClick={togglePasswordTwo}>
            {showPasswordTwo ? <EyeOff /> : <Eye />}
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
          ) : null}
        </div>

        

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className={`grow mt-3 text-white rounded-xl bg-red-500 hover:bg-red-600 hover:transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
   </section>
  );
}