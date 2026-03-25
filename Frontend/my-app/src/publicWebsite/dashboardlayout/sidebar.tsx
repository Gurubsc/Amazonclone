import Link from "next/link";
import { useRouter } from "next/router";
import { FaBox, FaShoppingCart, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <div
      className="sidebar"

    >
      <h4 className="mb-4">Dashboard</h4>

      <ul className="list-unstyled">

        <li className="mb-3">
          <Link
            href="/dashboard"
            className={`d-flex align-items-center gap-2 text-decoration-none ${
              isActive("/dashboard/products") ? "text-warning" : "text-white"
            }`}
          >
            <FaBox /> Products
          </Link>
        </li>

        <li className="mb-3">
          <Link
            href="/dashboard/orders"
            className={`d-flex align-items-center gap-2 text-decoration-none ${
              isActive("/dashboard/orders") ? "text-warning" : "text-white"
            }`}
          >
            <FaShoppingCart /> Orders
          </Link>
        </li>

        <li className="mb-3">
          <Link
            href="/dashboard/profile"
            className={`d-flex align-items-center gap-2 text-decoration-none ${
              isActive("/dashboard/profile") ? "text-warning" : "text-white"
            }`}
          >
            <FaUser /> Profile
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;