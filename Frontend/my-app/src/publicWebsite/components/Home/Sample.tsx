import axios from "axios"
import { useEffect } from "react"



const Products = () => {

    
    
// useEffect(() => {
//     const backendUrl = process.env.BACKEND_URL;

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`${backendUrl}/api/products`);
//             console.log("Products data:", response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     fetchData();
// }, []);

  return (
    <div>Products</div>
  )
}

export default Products