import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Navigation } from "./components/Navbar/Navigation"
import { ProtectedRoute } from "./components/Auth/ProtectedRoute"
import { SiteFooter } from "./components/Layout/SiteFooter"

const HomePage = lazy(() => import("./pages/home/HomePage").then((m) => ({ default: m.HomePage })))
const Signin = lazy(() => import("./pages/auth/Signin"))
const Signup = lazy(() => import("./pages/auth/Signup"))
const SearchDoctor = lazy(() => import("./pages/searchDoctor/SearchDoctor").then((m) => ({ default: m.SearchDoctor })))
const VideoCall = lazy(() => import("./components/VideoCall/VideoCall").then((m) => ({ default: m.VideoCall })))
const AiLab = lazy(() => import("./pages/AiLab/AiLab"))
const BookDoctor = lazy(() => import("./pages/searchDoctor/BookDoctor").then((m) => ({ default: m.BookDoctor })))
const ShoppingCart = lazy(() => import("./pages/ShoppingCart/ShoppingCart").then((m) => ({ default: m.ShoppingCart })))
const ProductsScreen = lazy(() => import("./pages/Medicines/ProductsScreen"))
const ProductDetail = lazy(() => import("./pages/Medicines/ProductDetail").then((m) => ({ default: m.ProductDetail })))
const Diabetes = lazy(() => import("./pages/AiLab/Diabetes"))
const HeartHealth = lazy(() => import("./pages/AiLab/HeartHealth"))
const SuccessPurchase = lazy(() => import("./pages/productPurchase/SuccessPurchase").then((m) => ({ default: m.SuccessPurchase })))
const StressPrediction = lazy(() => import("./pages/AiLab/StressPrediction"))
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })))

const RouteFallback = () => (
  <div className="mx-auto max-w-5xl px-4 py-16" aria-busy="true" aria-live="polite">
    <div className="h-8 w-48 animate-pulse rounded-full bg-ink/10" />
    <div className="mt-6 h-4 w-full max-w-xl animate-pulse rounded bg-ink/5" />
    <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-ink/5" />
  </div>
)

function AppRoutes() {
  const { pathname } = useLocation()
  const fullScreenRoute = pathname === "/consult"

  return (
    <>
      {!fullScreenRoute && (
        <a href="#main" className="skip-link">Skip to content</a>
      )}
      {!fullScreenRoute && <Navigation />}
      <main id="main" className="min-w-0 overflow-x-clip">
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/searchDoctor"
            element={
              <ProtectedRoute>
                <SearchDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookDoctor"
            element={
              <ProtectedRoute>
                <BookDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult"
            element={
              <ProtectedRoute>
                <VideoCall />
              </ProtectedRoute>
            }
          />
          <Route path="/medicines" element={<ProductsScreen />} />
          <Route path="/medicines/:title" element={<ProductDetail />} />
          <Route path="/AI_Lab" element={<AiLab />} />
          <Route path="/Ai_Lab" element={<Navigate to="/AI_Lab" replace />} />
          <Route path="/AI_Lab/Diabetes" element={<Diabetes />} />
          <Route path="/AI_Lab/Heart_Health" element={<HeartHealth />} />
          <Route path="/AI_Lab/Stress_Prediction" element={<StressPrediction />} />
          <Route
            path="/shoppingCart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchaseProductSuccess"
            element={
              <ProtectedRoute>
                <SuccessPurchase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purshaseProductSuccess"
            element={<Navigate to="/purchaseProductSuccess" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {!fullScreenRoute && <SiteFooter />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
