import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect , useState , useContext} from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  ratings?: number;
  image?: {
    filename: string;
  };
}

export default function ProductPage() {
    const searchParams = useSearchParams();
    const  id=searchParams.get("id");
    const [product, setProduct] = useState<Product | null>(null);
    const { getUserDetails } = useContext(AuthContext);

      useEffect(() => {
        const fetchProductDetails = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`);
            console.log("Fetched product details:", res.data);
            setProduct(res.data.product);
          } catch (err) {
            console.error("Error fetching product details:", err);
          }
        };

        if (id) {
          fetchProductDetails();
        }
      }, [id]);

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
    <div className="container product-page ">
      <div className="row align-items-center">
        
        {/* LEFT SIDE - IMAGE */}
        {product && (
          <>

            <div className="col-md-6 mb-4">
              <Image
                src={product.image.filename}
                alt={product.name}
                width={600}
                height={500}
                className="product-image"
                unoptimized
              />
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="col-md-6">
              <h1 className="product-title">{product.name}</h1>

              <p className="text-muted">Category: {product.category}</p>

              <p className="product-price">{product.price}</p>

              <p className="product-description">
                {product.description || "This is a high-quality product that meets all your needs and expectations. Crafted with precision and care, it offers exceptional performance and durability. Whether you're looking for style, functionality, or both, this product delivers on all fronts."}
              </p>

              {/* <ul>
                <li>{product.ratings}</li>
                <li>1TB SSD</li>
                <li>RTX Graphics</li>
                <li>144Hz Display</li>
              </ul> */}

              <div className="mt-4">
                <Link href={{
                  pathname: `/order`,
                  query: { id: product._id },
                }} className="btn btn-success buy-btn me-3">
                  Buy Now
                </Link>
                <button className="btn btn-outline-secondary buy-btn" onClick={() => handleAddToCart(product._id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </>

        )}
      

      </div>
    </div>
  );
}
