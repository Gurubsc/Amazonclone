"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

// ✅ Interfaces
interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface ProductImage {
  filename: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: ProductImage;
  ratings: number;
  seller: string;
  stock: number;
  numOfReviews: number;
  reviews: Review[];
}

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { getUserDetails } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Products
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!user?.products?.length) {
          setLoading(false);
          return;
        }

        const responses = await Promise.all(
          user.products.map((id: string) =>
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
            )
          )
        );

        // ✅ IMPORTANT FIX (extract product)
        const data: Product[] = responses.map(
          (res) => res.data.product
        );
        
        // console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const handleRemoveFromCart = (productId: string) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/removeid`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        window.alert(res.data.message || "Product removed from cart!");
        // ✅ Update local state to reflect removal
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
          getUserDetails(); // ✅ Refresh user details to update cart
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        window.alert("Please try again.");
      });
    }
  // ✅ Loading UI
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container margin">
      <h1 className="mb-4">Cart Page</h1>

      {products.length === 0 ? (
        <p className="margin">No products in cart</p>
      ) : (
        <div className="row">
          {products.map((product, index) => (
            <div
              key={product._id || index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div className="shadow rounded p-3 h-100 d-flex flex-column">

                {/* ✅ Image */}
                <Image
                  src={product.image?.filename}
                  alt={product.name || "Product Image"}
                  width={400}
                  height={300}
                  loading="eager" // ✅ Important for cart images
                  unoptimized // ✅ Important for cart images
                  className="rounded"
                  style={{ width: "100%", height: "auto" }}
                />

                <div className="mt-2 flex-grow-1">
                  <h2 className="h6">{product.name}</h2>

                  <p className="text-muted small">
                    {product.description}
                  </p>

                  <p className="fw-bold">
                    ₹{product.price}
                  </p>

                  <p>⭐ {product.ratings}</p>
                  <p className="small text-muted">
                    Seller: {product.seller}
                  </p>
                </div>

                {/* ✅ Buttons */}
                <div className="d-flex flex-column gap-2 mt-auto">
                  <Link
                    href={{
                      pathname: "/product",
                      query: { id: product._id },
                    }}
                    className="btn btn-success"
                  >
                    Proceed to Checkout
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product._id)}> 
                    Remove from Cart
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart