import next from "next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState , useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";



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
  

const order = () => {
    const searchParams = useSearchParams();
    const  id=searchParams.get("id");
    const [product, setProduct] = useState <Product | null>(null);
    const [user, setUser] = useState(null);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`);
            setProduct(res.data.product);
          } catch (err) {
            console.error("Error fetching order details:", err);
          }
        };

        if (id) {
          fetchOrderDetails();
        }
        }, [id]);
    
    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //       try {
    //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         });
    //         setUser(res.data.user);
    //       } catch (err) {
    //         console.error("Error fetching user details:", err);
    //       }
    //     };

    //     fetchUserDetails();
    // }, []);

useEffect(() => {
    // ✅ Prefill address fields with dummy data
    setAddress("123 Main Street");
    setCity("Chennai");
    setState("Tamil Nadu");
    setCountry("India");
    setPostalCode("605104");
    setContactNumber("9876543210");

    
}, []);


const createOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        shippingInfo: {
          address,
          city,
          state,
          country,
          pinCode: Number(postalCode),
          phoneNo: Number(contactNumber),
        },

        orderItems: [
          {
            name: product?.name || "Sample Product",
            quantity: 1,
            price: product?.price || 100,
            image:
              product?.image?.filename ||
              product?.image ||
              "default.jpg",
            product: product?._id,
          },
        ],

        // ✅ FIXED
        paymentInfo: {
          name: paymentMethod,
        },


        itemsPrice: product?.price || 100,
        taxPrice: 10,
        shippingPrice: 20,
        totalPrice: (product?.price || 100) + 30,
      }
    );

    alert("✅ Order created successfully!");
  
    

  } catch (err: any) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "❌ Error creating order");
  }
};





  return (
    <div className="container margin">

         <h2 className="text-center">Order Page</h2>
          {product && (
              <div className="card mb-3 p-2 shadow-sm border-0 small-card d-flex flex-row align-items-center">

                  {/* Image */}
                  <Image
                      src={product.image?.filename || "/placeholder.png"}
                      alt={product.name}
                      width={100}
                      height={100}
                      unoptimized
                      className="rounded-3"
                  />

                  {/* Content */}
                  <div className="ms-3 flex-grow-1">

                      <h6 className="mb-1 fw-semibold">
                          {product.name}
                      </h6>

                      <p className="mb-1 text-muted small text-truncate">
                          {product.description}
                      </p>

                      <span className="fw-bold text-success">
                          ₹{product.price}
                      </span>

                  </div>

              </div>
          )}

         <hr />
         <form onSubmit={createOrder} className=" mx-auto">
            <div className="mb-3">
                <label className="form-label">Shipping Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter your shipping address" required />
            </div>
             
             <div className="mb-3"> 
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" required />
             </div>
              
             <div className="mb-3">
                <label className="form-label">State</label>
                <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your state" required />
             </div>

              <div className="mb-3">
                  <label className="form-label">Country</label>

                  <select
                      className="form-select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      required
                  >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                    
                  </select>

              </div>

             <div className="mb-3">
                <label className="form-label">Postal Code</label>
                <input type="Number" value={postalCode} onChange={(e) => setPostalCode ( e.target.value)} className="form-control" placeholder="Enter your postal code" required />
            </div>


            <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input type="Number" className="form-control" value={contactNumber} onChange={(e) => setContactNumber( e.target.value)} placeholder="Enter your contact number" required />
            </div>

            <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                    <option value="">Select Payment Method</option>
                    {/* <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option> */}
                    <option value="cod">Cash on Delivery</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary m-4">Submit Order</button>
         </form>

    </div>
  )
}

export default order