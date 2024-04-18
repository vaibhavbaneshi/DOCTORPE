import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { Navigation } from "./components/Navbar/Navigation"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import { SearchDoctor } from "./pages/searchDoctor/SearchDoctor"
import AiLab from "./pages/AiLab/AiLab"
import { BookDoctor } from "./pages/searchDoctor/BookDoctor"
import { ShoppingCart } from "./pages/ShoppingCart/ShoppingCart"
import ProductsScreen from "./pages/Medicines/ProductsScreen"
import { ProductDetail } from "./pages/Medicines/ProductDetail"
import Diabetes from "./pages/AiLab/Diabetes"
import HeartHealth from "./pages/AiLab/HeartHealth"
import { SuccessPurchase } from "./pages/productPurchase/SuccessPurchase"
import StressPrediction from "./pages/AiLab/StressPrediction"

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
          <Route path="/medicines"element={<ProductsScreen />}/>
          <Route path="/medicines/:title" element={<ProductDetail />} />
          <Route path="/AI_Lab"element={<AiLab />}/>
          <Route path="/AI_Lab/Diabetes"element={<Diabetes />}/>
          <Route path="/AI_Lab/Heart_Health"element={<HeartHealth />}/>
          <Route path="/AI_Lab/Stress_Prediction"element={<StressPrediction />}/>
          <Route path="/shoppingCart"element={<ShoppingCart />}/>
          <Route path="/purshaseProductSuccess"element={<SuccessPurchase />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
