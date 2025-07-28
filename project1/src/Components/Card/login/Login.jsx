import { Formik, useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState('password');
  let [loading, setLoading] = useState(false); // إضافة حالة التحميل

  async function sendDataToLogin(formValues) {
    setLoading(true); // تفعيل التحميل عند بدء المعالجة
    try {
      if (formValues.email && formValues.password) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // تأخير لمحاكاة التحميل
        toast.success('Welcome to the app!');
        navigate('/card'); 
      } else {
        toast.error('Please fill in all fields correctly.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  }

  // إظهار أو إخفاء الباسورد
  function togglePassword() {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  }

  let validationLogin = yup.object().shape({
    email: yup.string().email('Email must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  let formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLogin,
    onSubmit: sendDataToLogin, 
  });

  return (
    <section className='min-h-screen flex  bg-white dark:bg-gray-800'>
      <div className="container mx-auto ">
        <form className="mt-25 mx-auto w-md  shadow-2xl shadow-red-200 bg-gray-100 p-3 rounded-xl" onSubmit={formikLogin.handleSubmit}>
          <h4 className="text-red-500 text-2xl font-bold pb-3">Login Now:</h4>

          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">Your email:</label>
            <input
              type="email"
              name="email"
              value={formikLogin.values.email}
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none"
              required
            />
            {formikLogin.touched.email && formikLogin.errors.email ? (
              <div className="text-red-500 text-sm">{formikLogin.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-3 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900">Your password:</label>
            <input
              type={showPassword}
              name="password"
              value={formikLogin.values.password}
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none"
              required
            />
            {formikLogin.touched.password && formikLogin.errors.password ? (
              <div className="text-red-500 text-sm">{formikLogin.errors.password}</div>
            ) : null}
            <div className="absolute top-8 right-2 cursor-pointer" onClick={togglePassword}>
              {showPassword === 'password' ? <Eye /> : <EyeOff />}
            </div>
          </div>

          <div className="flex justify-start mb-2">
            <button
              type="submit"
              disabled={loading}
              className={`grow mt-3 text-white bg-red-500 hover:bg-red-600 hover:transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              
              Login
            </button>
          </div>
          <p>
            You don't have an account?{' '}
            <span className="text-red-500 text-xl font-bold hover:text-red-700">
              <Link to={'/register'}>Register Now</Link>
            </span>
          </p>
        
        </form>
      </div>
    </section>
  );
}