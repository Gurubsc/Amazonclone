// components/DashboardLayout.js
import Sidebar from "@/publicWebsite/dashboardlayout/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#eee", minHeight: "100vh" }} className="sticky-top">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-3">
        {children}
      </div>
    </div>
  );
}