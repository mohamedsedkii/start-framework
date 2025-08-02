import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));

  async function verifyToken() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      setToken(null);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
   <authContext.Provider value={{token,setToken}}>
    {children}
   </authContext.Provider>
  );
}
