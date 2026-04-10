import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Login'
import ForgotPassword from '../ForgotPassword'
import Dashboard from '../Dashboard'
import Products from '../Products'
import NewProduct from '../NewProduct'
import NewMovement from '../NewMovement'
import MainLayout from '../../layouts/MainLayout'
import { useAuth } from '../../context/AuthContext'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

function App() {
  const { state } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/:id" element={<div>Product Detail (Coming Soon)</div>} />
          <Route path="movements/new" element={<NewMovement />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
