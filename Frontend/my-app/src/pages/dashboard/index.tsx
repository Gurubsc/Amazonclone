// pages/dashboard/index.js
import Product from "@/publicWebsite/dashboardlayout/product";

import DashboardLayout from "@/publicWebsite/dashboardlayout/DashboardLayout";

export default function DashboardPage() {
  return <Product />;
}

// 👇 Attach layout
DashboardPage.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};