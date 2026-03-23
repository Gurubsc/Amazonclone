import { useState , useCallback } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState(null);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", image);
  setImage(null); // Clear the image state after appending to FormDa

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      formData
    );

    // ✅ get filename from backend
    const fileName = res.data.file.filename;

    // ✅ build image URL
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/image/${fileName}`;

    console.log("Image URL:", imageUrl);

    // 👉 now send to product API
   await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/products/new`,
  {
    name,
    description,
    price,
    category,
    image: {
      filename: imageUrl,
    },
    seller,
    stock,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }
);
    window.alert("Product added successfully!");
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock("");
    setSeller("");
    setImage(null);
  } catch (err) {
    window.alert("Error adding product. Please try again.");
    console.error(err);
  }
};

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="mb-4 text-center">Add Product</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* Product Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="fruits">Fruits</option>
                <option value="food">Food</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="home">Sports</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Stock */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            {/* Seller */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Seller Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter seller name"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="text-center mt-3">
            <button className="btn btn-primary px-5" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}