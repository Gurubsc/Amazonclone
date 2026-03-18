"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";


const products = [
  {
    id: 1,
    title: "Gaming Laptop",
    brand: "Dell",
    price: 1200,
    image: "https://picsum.photos/seed/laptop/300/200",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    brand: "Sony",
    price: 150,
    image: "https://picsum.photos/seed/headphone/300/200",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    brand: "JBL",
    price: 200,
    image: "https://picsum.photos/seed/speaker/300/200",
  },
  {
    id: 4,
    title: "Mechanical Keyboard",
    brand: "Logitech",
    price: 100,
    image: "https://picsum.photos/seed/keyboard/300/200",
  },
  {
    id: 5,
    title: "Smart TV",
    brand: "Samsung",
    price: 900,
    image: "https://picsum.photos/seed/tv/300/200",
  },
];

export default function SearchPage() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState(1500);
  const searchParams = useSearchParams();
  const term = searchParams.get("term");

  const brands = ["Dell", "Sony", "JBL", "Logitech", "Samsung"];

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = products.filter((p) => {
    // BRAND FILTER
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);

    // PRICE FILTER
    const priceMatch = p.price <= price;

    // TERM WORDS
    const words = term
      ? term.toLowerCase().trim().split(/\s+/)
      : [];

    // TERM MATCH: checks each word in title OR brand
    const termMatch =
      words.length === 0 ||
      words.every((word) => {
        const inTitle = p.title.toLowerCase().includes(word);
        const inBrand = p.brand.toLowerCase().includes(word);
        return inTitle || inBrand;
      });

    return brandMatch && priceMatch && termMatch;
  });


  return (
    <div className="container mt-5 margin">
      <div className="row searchpage">

        {/* FILTER SECTION */}
        <div className="col-md-3 mb-4 ">
          <div className={`filter-box ${filteredProducts.length !== 0 ? "" : "d-none"}`}>
            <h5 className="mb-3">Filters</h5>

            {/* Brand Filter */}
            <div className="mb-4">
              <h6>Brand</h6>
              {brands.map((brand) => (
                <div className="form-check" key={brand}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={brand}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label className="form-check-label" htmlFor={brand}>
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Slider (Volume style) */}
            <div>
              <h6>
                Price: <span className="price-value">${price}</span>
              </h6>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1500"
                step="50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="d-flex justify-content-between">
                <small>$0</small>
                <small>$1500</small>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="col-md-9">
          <h5 className="mb-3">Search Results</h5>

          <div className="row">
            {filteredProducts.length === 0 && (
              <div className="col-12 noresults">
                  <p className="margin">No products found</p>
              </div>
            )}

            {filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card product-card h-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    unoptimized
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="card-title">{product.title}</h6>
                    <p className="text-muted mb-1">{product.brand}</p>
                    <p className="fw-bold">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
