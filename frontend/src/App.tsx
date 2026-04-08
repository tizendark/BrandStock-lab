import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import NewMovement from './pages/NewMovement'
import MainLayout from './layouts/MainLayout'

function App() {
  // TODO: Implementar autenticación real
  const isAuthenticated = true

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route 
        path="/" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<NewProduct />} />
        <Route path="products/:id" element={<div>Product Detail (Coming Soon)</div>} />
        <Route path="movements/new" element={<NewMovement />} />
      </Route>
    </Routes>
  )
}

export default App
