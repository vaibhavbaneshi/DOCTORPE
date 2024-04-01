import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { Navigation } from "./components/Navbar/Navigation"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import { SearchDoctor } from "./pages/searchDoctor/SearchDoctor"
import { VideoCall } from "./components/VideoCall/VideoCall"
import AiLab from "./pages/AiLab/AiLab"
import { BookDoctor } from "./pages/searchDoctor/BookDoctor"
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart"
import ProductsScreen from "./pages/screens/ProductsScreen"
import { ProductDetail } from "./pages/screens/ProductDetail"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/searchDoctor" element={<SearchDoctor />} />
          <Route path="/bookDoctor" element={<BookDoctor />} />
          <Route path="/consult" element={<VideoCall />} />
          <Route path="/medicines"element={<ProductsScreen />}/>
          <Route path="/medicines/:title" element={<ProductDetail />} />
          <Route path="/AI_Lab"element={<AiLab />}/>
          <Route path="/shoppingCart"element={<ShoppingCart />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
