import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


    export let cartContext =createContext(null)
    export default function CartContextProvider({children}) {
        let [cart,setCart]=useState(null)
    
    //عشان المنتجات تكون ظاهره اول لما افتح الويب سايت في الكارت
    async function getCartProduct(){
     try{
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token: localStorage.getItem("token")
            }
        })
        console.log(data);
        setCart(data)
        

     }catch(error){
        console.log(error);
        
     }
    }

    // عشان اقدر اضيف منتج للكارت بتاعتي 
     async function addProductToCart(productId){
     try{
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId
            },{
            headers:{
                token: localStorage.getItem("token")
            }
        })
        console.log(data);
        setCart(data)
        toast.success("Product is added successfully to your Cart")    
        
        

     }catch(error){
        console.log(error);
        
     }
    }


    // عشان اقدر اسمع منتج من الكارت
    async function removeProductFromCart(cartId){
       try{
         let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartId}`,{
            headers:{
                token: localStorage.getItem("token")
            }
        })

        setCart(data)
        toast.success("Product removed successfully!",{style:'colo' });
        
       }
       catch(error){
        console.log(error);
        
       }
    }

    // عشان اقدر امسح المنتجات اللي في الكارت مره واحده
    async function clearUserCart() {
        try{
        let {data}=axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })  
        setCart(data)

        }
        catch(error){
            console.log(error);
            
        }
        
    }

    //عشان اقدر ازود منتج او نقص منتج براحتي 
    async function updateCartProduct(count,cartId) {
        try{
            let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartId}`,{
                count,
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            }
        )
        setCart(data)
        toast.success(`You have ${count} pieces now`)
        }
        catch(error){
            console.log(error);
            
        }
        
    }
    
    //لتشغيل الكارت اول لما افتح الويب سايت
    
    useEffect(()=>{
    getCartProduct()
    },[])




      return (
        <cartContext.Provider value={{cart,addProductToCart,getCartProduct,removeProductFromCart,clearUserCart,updateCartProduct ,}}>
            {children}
        </cartContext.Provider>

      )
    }
    
