// components/DashboardLayout.js
import Sidebar from "@/publicWebsite/dashboardlayout/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex">
      {/* Sidebar */}
    
        <Sidebar />
    

      {/* Content */}
      <div className="flex-grow-1 p-2 margin-left">
        {children}
      </div>
    </div>
  );
}