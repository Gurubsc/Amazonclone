import Link from "next/link";
import axois from "axios";
import { useState, useEffect ,useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const vegetableData = [
  {
    id: 1,
    name: "Parsley",
    image: "/img/vegetable-item-6.jpg",
    price: "$4.99 / kg",
    category: "Vegetable",
  },
  {
    id: 2,
    name: "Parsley",
    image: "/img/vegetable-item-1.jpg",
    price: "$4.99 / kg",
    category: "Vegetable",
  },
  {
    id: 3,
    name: "Banana",
    image: "/img/vegetable-item-3.png",
    price: "$7.99 / kg",
    category: "Vegetable",
  },
  {
    id: 4,
    name: "Bell Pepper",
    image: "/img/vegetable-item-4.jpg",
    price: "$7.99 / kg",
    category: "Vegetable",
  }
];

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: {
    filename: string;
  };
}


export default function SecondCard() {
  const [fruits , setfruits] = useState<Product[]>([]);
  const { getUserDetails } = useContext(AuthContext);
  const [error, setError] = useState("");
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const res = await axois.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/fruits`);
        setfruits(res.data.products);
      } catch (err) {
        console.error("Error fetching fruits:", err);
      }
    };

    fetchFruits();
  }, []);


   const handleAddToCart = async (productId: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addproduct`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        getUserDetails(); // ✅ Refresh user details to update cart
        window.alert(res.data.message || "Product added to cart!");
    } catch (err) {
     
        console.error("Error:", err.response?.data || err.message);
          window.alert("Please try again or you may already have this product in your cart."); 
    }
  };
  return (
    <div className="container-fluid vesitable py-5">
      <div className="container py-5">
        <h1 className="mb-0">Fresh Organic Fruits</h1>

         <div className="row g-4 mt-3">
  {fruits.map((item) => (
    <div key={item._id} className="col-lg-3 col-md-4 col-sm-6">
         <Link href={{
                  pathname: `/product`,
                  query: { id: item._id },

         }} className="text-decoration-none text-dark">
      <div className="border border-primary rounded position-relative vesitable-item h-100">
        <div className="vesitable-img">
          <img
            src={item.image?.filename || "/img/vegetable-item-6.jpg"}
            className="img-fluid w-100 rounded-top"
            alt={item.name}
          />
        </div>

        <div
          className="text-white bg-primary px-3 py-1 rounded position-absolute"
          style={{ top: 10, right: 10 }}
        >
          {item.category}
        </div>

        <div className="p-4 rounded-bottom">
          <h4>{item.name}</h4>
          <p className="small">
            Fresh quality products at best prices.
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <p className="text-dark fw-bold mb-0">{item.price}</p>
            <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation
              handleAddToCart(item._id); // Call add to cart function
            }}>
              <i className="fa fa-shopping-bag me-2 text-primary"></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
