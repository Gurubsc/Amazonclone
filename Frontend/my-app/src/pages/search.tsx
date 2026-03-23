"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect , useState} from "react";
import axios from "axios";

// const products = [
//   {
//     id: 1,
//     title: "Gaming Laptop",
//     brand: "Dell",
//     price: 1200,
//     image: "http://localhost:8000/api/image/09.jpg",
//   },
//   {
//     id: 2,
//     title: "Wireless Headphones",
//     brand: "Sony",
//     price: 150,
//     image: "http://localhost:8000/api/image/09.jpg",
//   },
//   {
//     id: 3,
//     title: "Bluetooth Speaker",
//     brand: "JBL",
//     price: 200,
//     image: "http://localhost:8000/api/image/09.jpg",
//   },
// ];

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: {
    filename: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const [Product, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

 useEffect(() => {
  const fetchProducts = async () => {
    try {
       const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search?keyword=${term}`
        );

      setProducts(res.data.products);
      setError(""); // clear error
    } catch (err) {
      // 👇 Get backend message
      setError(err.response?.data?.message || "Something went wrong");
      setProducts([]); // clear products
    }
  };

  if (term) fetchProducts();
}, [term]);

  
  return (
    <div className="container margin">
      <div className="row">
        <h5 className="mb-3">Search Products</h5>
        {error &&
        
        <div className="alert alert-danger p-4">{error}</div>
        }

        {Product.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card product-card h-100 shadow-sm border-0">

              <div className="image-wrapper">
                <Image
                  src={product.image.filename}
                  alt={product.name}
                  width={200}
                  height={200}
                  unoptimized
                  className="product-image card-img-top"
                />
              </div>

              <div className="card-body text-center">
                <h6 className="fw-semibold">{product.name}</h6>
                <p className="text-muted small mb-1">{product.category}</p>
                <p className="fw-bold text-primary fs-5">{product.price}</p>

                <button className="btn btn-dark btn-sm mt-auto w-100">
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}