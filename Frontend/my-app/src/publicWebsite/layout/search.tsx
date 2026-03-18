
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; 
import { useRouter } from "next/router";


export default function Search() {
       const [searchTerm, setSearchTerm] = useState("");
       const router = useRouter();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Navigate with query param
    router.replace(`/search?term=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

    return <div className="position-relative d-none d-md-block" style={{ width: "250px" }}>
        <form onSubmit={handleSearch}>
            <input
                type="text"
                className="form-control ps-5"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
        <FaSearch
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary"
            />
        </form>
    </div>
}