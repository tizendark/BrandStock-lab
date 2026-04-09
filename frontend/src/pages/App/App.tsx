import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Login'
import ForgotPassword from '../ForgotPassword'
import Dashboard from '../Dashboard'
import Products from '../Products'
import NewProduct from '../NewProduct'
import NewMovement from '../NewMovement'
import MainLayout from '../../layouts/MainLayout'
import { useAppContext } from '../../context/AppContext'

function App() {
  const { state } = useAppContext();
  const { isAuthenticated } = state;

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
