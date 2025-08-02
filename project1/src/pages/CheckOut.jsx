import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup'
import { cartContext } from './Context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BanknoteArrowUp, IdCard } from 'lucide-react';

export default function CheckOut() {
    let{cart,getCartProduct}= useContext(cartContext)
    let Navigate =useNavigate()
    let [pay,setPay]=useState('cash')

        async function payOnline(cartId,values) {
        try{
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        {
            shippingAddress:values
        },
        {
            headers:{
                token:localStorage.getItem('token')
            },
        }
            
        )
        
        toast.loading('Waiting...');

        if(data.status == "success"){
          window.location.href = data.session.url
        }
    
        
         }catch(error){
            console.log(error);
         }
        
        
        
    }



   async function cashOrder(values){
    try{
       let{data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
      {
        shippingAddress:values
      },
      {
        headers:{
           token:localStorage.getItem('token')
  
        }
      }
     )

     toast.success('Order Created Successfully')

     if(data.status== "success"){
      Navigate('/AllOrders')
      getCartProduct()
     }
     
    }
    catch(error){
      console.log(error);
      
    }
     



    }


    let validation=yup.object().shape({
        details: yup.string().required('address is required'),
        phone: yup.string().required('Phone is required'),
        city:yup.string().required('city is required'),
    })

    let formik=useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:"",
            
        },
        validationSchema:validation,
        onSubmit: (x) =>{
          if(pay =='cash'){
            cashOrder(x)
          }else{
            payOnline(x)
          }
        }

    })


  
  return (
   <>
    <div className=" container mx-auto  flex justify-center items-center">
    
    <form className=" mt-24 w-1/2 py-7 " onSubmit={formik.handleSubmit} >
     <h1 className="text-2xl text-center  text-green-500 font-bold tracking-tight drop-shadow-lg ">Cart Total </h1>
     <h1 className="text-xl text-green-500 font-medium mt-5 ">Total Price : <span className='text-red-600'>EGP {cart?.data.totalCartPrice}</span></h1>
      {formik.touched.city&&formik.errors.city ?(
       <div className="text-red-500 text-sm">{formik.errors.city}</div>
      ):null}

     <input type="text" name="city" placeholder='Enter Your City Name...' 
     value={formik.values.city}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    className="block w-full my-3 p-2 bg-white border rounded outline-green-500 border-gray-500"
    />
    {formik.touched.phone&&formik.errors.phone ? (
    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
   
    ): null }
     <input type="number" name="phone" placeholder='Enter Your Phone...'
     value={formik.values.phone}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     className="block w-full bg-white my-3 p-2 border rounded outline-green-500 border-gray-500"

     />
     {formik.touched.details&&formik.errors.details?(
    <div className="text-red-500 text-sm">{formik.errors.details}</div>

     ): null}

     <textarea placeholder='Enter Your Address... '
     name='details'
     value={formik.values.details}
     className="block w-full bg-white my-3 p-2 border rounded outline-green-500 border-gray-500  "
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    >
     </textarea>
    
    <div className='flex justify-between items-center gap-2'>
        <button type='submit'
        onClick={()=>{setPay('cash')}}
        className="flex justify-center items-center gap-2 bg-green-500 text-white w-full py-3  rounded-xl text-xl hover:bg-green-600 hover:transition-all duration-500"
        ><BanknoteArrowUp /> Cash Order</button>

        <button type='submit'
        onClick={()=>{setPay('online')}}
        className="flex justify-center items-center gap-2 bg-gray-300 text-black  w-full py-3  rounded-xl text-xl hover:bg-blue-600 hover:text-white hover:transition-all duration-500">
         <IdCard /> Online Order</button>
    </div>
    
    </form>
   </div>

   </>
  );
}
