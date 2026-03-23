import Header from "./header"
import Footer from "./footer"
import { AuthProvider } from "@/context/AuthContext";

const LayoutProvider = ({ children }) => {
  return (
    <div className="layout-provider">
      <AuthProvider>

        <Header />
        {children}
        <Footer />

      </AuthProvider>
    </div>
  )
}

export default LayoutProvider