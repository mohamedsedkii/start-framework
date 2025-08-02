import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'

export default function ResetPassword() {
  const navigate = useNavigate()


  async function sendCode(values){
        try{
        let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
         console.log(data);
         navigate("/newPassword")
        }catch(err){
            console.log(err);
            
            
        }
    }

    let validationForget=yup.object().shape({
    resetCode:yup.string().required('code is required'),
      
    })
    
      let formik=useFormik({
        initialValues:{
        resetCode:"",
        
       },
       validationSchema:validationForget,
       onSubmit:sendCode,
    
      })


  return (
    <div className="mt-25">
      <div className="container mx-auto  p-3 bg-gray-100  rounded-xl">
        <h2 className="text-gray-500 text-3xl font-medium">please Your Reset Code</h2>
        <form onSubmit={formik.handleSubmit}>
               <div className="flex-column mt-4 space-y-3">
            <h4>reset code</h4>
            <input type="number"
             name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             placeholder="your reset code..." className="placeholder:text-gray-500 w-full border border-gray-300 rounded-lg px-4 py-2  focus:outline-4 focus:outline-green-200 " />
        
        {formik.touched.resetCode && formik.errors.resetCode?(
        <div className="text-red-500">{formik.errors.resetCode}</div>
        )
        :null}
        </div>

       <div className="text-center mt-8">
      
         <button type="submit" 
        className=" mt-3 text-white bg-green-500 hover:bg-green-600 hover:transition-all duration-300 font-medium rounded-lg w-4xl px-5 py-2.5 text-center "
        disabled={formik.isSubmitting}
        >
          {formik.isSubmitting? "Sending.....":"Verify"}
        
        </button>
      
      
       </div>
        </form>
        </div>   
        </div>
    
 


  )
}