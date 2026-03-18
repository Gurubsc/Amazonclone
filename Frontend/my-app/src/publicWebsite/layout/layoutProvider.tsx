import Header from "./header"
import Footer from "./footer"

const LayoutProvider = ({ children }) => {
  return (
    <div className="layout-provider">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LayoutProvider