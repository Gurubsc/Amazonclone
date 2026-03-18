import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="container product-page ">
      <div className="row align-items-center">
        
        {/* LEFT SIDE - IMAGE */}
        <div className="col-md-6 mb-4">
          <Image
            src="https://picsum.photos/seed/laptop/600/500"
            alt="Gaming Laptop"
            width={600}
            height={500}
            className="product-image"
            unoptimized
          />
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="col-md-6">
          <h1 className="product-title">Gaming Laptop</h1>

          <p className="text-muted">Category: Computers</p>

          <p className="product-price">$1,299.99</p>

          <p className="product-description">
            Powerful gaming laptop with a high-performance processor, advanced
            graphics card, fast SSD storage, and a stunning display. Perfect for
            gaming, development, and heavy workloads.
          </p>

          <ul>
            <li>16GB RAM</li>
            <li>1TB SSD</li>
            <li>RTX Graphics</li>
            <li>144Hz Display</li>
          </ul>

          <div className="mt-4">
            <button className="btn btn-success buy-btn me-3">
              Buy Now
            </button>
            <button className="btn btn-outline-secondary buy-btn">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
