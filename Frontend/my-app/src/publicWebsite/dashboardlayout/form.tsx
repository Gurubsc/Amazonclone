 <form>
          <div className="row">

            {/* Product Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" className="form-control" placeholder="Enter product name" required />
            </div>

            {/* Price */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" placeholder="Enter price" required />
            </div>

            {/* Description */}
            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="3" placeholder="Enter product description" required />
            </div>

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select className="form-select">
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
              <input type="number" className="form-control" placeholder="Enter stock quantity" required />
            </div>

            {/* Seller */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Seller Name</label>
              <input type="text" className="form-control" placeholder="Enter seller name" required />
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
            <button className="btn btn-primary px-5">
              Submit
            </button>
          </div>
        </form>