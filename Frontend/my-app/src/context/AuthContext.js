import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getdetails`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });
    
      setUser(res.data.user);
    } catch (error) {
      console.log(error.response?.data);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading , getUserDetails}}>
      {children}
    </AuthContext.Provider>
  );
};