// components/OrganicProducts.jsx
import Image from "next/image";
import Link from "next/link";
// data/products.js
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    category: "Audio",
    image: "https://picsum.photos/seed/headphones/500/350",
    price: "$59.99",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    title: "Gaming Laptop",
    category: "Computers",
    image: "https://picsum.photos/seed/laptop/500/350",
    price: "$1,299.99",
    description: "Powerful gaming laptop with high-end graphics.",
  },
  {
    id: 3,
    title: 'Smart TV 55"',
    category: "TV & Home Theater",
    image: "https://picsum.photos/seed/tv/500/350",
    price: "$699.99",
    description: "Ultra HD Smart TV with vibrant colors.",
  },
  {
    id: 4,
    title: "Portable Power Bank",
    category: "Accessories",
    image: "https://picsum.photos/seed/powerbank/500/350",
    price: "$29.99",
    description: "High-capacity power bank for travel.",
  },
  {
    id: 5,
    title: "Smartphone Stand",
    category: "Accessories",
    image: "https://picsum.photos/seed/mobile/500/350",
    price: "$12.99",
    description: "Adjustable stand for desk use.",
  },
  {
    id: 6,
    title: "Bluetooth Speaker",
    category: "Audio",
    image: "https://picsum.photos/seed/speaker/500/350",
    price: "$49.99",
    description: "Portable speaker with rich sound.",
  },
  {
    id: 7,
    title: "LED Desk Lamp",
    category: "Home Electronics",
    image: "https://picsum.photos/seed/lamp/500/350",
    price: "$34.99",
    description: "LED lamp with USB charging.",
  },
  {
    id: 8,
    title: "Mechanical Keyboard",
    category: "Computers",
    image: "https://picsum.photos/seed/keyboard/500/350",
    price: "$89.99",
    description: "RGB mechanical keyboard.",
  },
];




export default function Cards() {
  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <h1 className="text-center mb-5">Our Organic Products</h1>

        <div className="row g-4">
          {products.map((item) => (
           <div key={item.id} className="col-md-6 col-lg-4 col-xl-3">
  <Link href="/product" className="text-decoration-none text-dark">
    <div className="rounded position-relative fruite-item card h-100">
      
      {/* Image */}
      <div className="fruite-img">
        <Image
          src={item.image}
          alt={item.title}
          width={300}
          height={300}
          unoptimized
          className="img-fluid w-100 rounded-top"
        />
      </div>

      {/* Category badge */}
      <div
        className="text-white bg-primary px-3 py-1 rounded position-absolute"
        style={{ top: "10px", left: "10px" }}
      >
        {item.category}
      </div>

      {/* Content */}
      <div className="p-4 border-top-0 rounded-bottom">
        <h4>{item.title}</h4>
        <p>{item.description}</p>

        <div className="d-flex justify-content-between align-items-center">
          <p className="text-dark fs-5 fw-bold mb-0">
            {item.price}
          </p>

          {/* Button – NOT a Link */}
          <button
            className="btn btn-outline-primary rounded-pill px-3 "
            onClick={(e) => {
              e.preventDefault(); // stop page navigation
              console.log("Add to cart", item.id);
            }}
          >
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
