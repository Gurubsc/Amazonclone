import Link from "next/link";

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

export default function SecondCard() {
  return (
    <div className="container-fluid vesitable py-5">
      <div className="container py-5">
        <h1 className="mb-0">Fresh Organic Vegetables</h1>

         <div className="row g-4 mt-3">
  {vegetableData.map((item) => (
    <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
         <Link href="/product" className="text-decoration-none text-dark">
      <div className="border border-primary rounded position-relative vesitable-item h-100">
        <div className="vesitable-img">
          <img
            src={item.image}
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
            <button className="btn btn-outline-primary btn-sm rounded-pill">
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
