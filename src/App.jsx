import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { Navigation } from "./components/Navbar/Navigation"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import { SearchDoctor } from "./pages/searchDoctor/SearchDoctor"
import { VideoCall } from "./components/VideoCall/VideoCall"
import Medicine from "./pages/Medicine/Medicine"
import AiLab from "./pages/AiLab/AiLab"
import ProductsScreen from './screens/ProductsScreen';
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
          <Route path="/consult" element={<VideoCall />} />
          <Route path="/medicines"element={<ProductsScreen />}/>
          <Route path="/AI_Lab"element={<AiLab/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
