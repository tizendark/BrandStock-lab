import { useState, type FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Package, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, state } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/')
    }
  }, [state.isAuthenticated, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      await login(formData)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Verifique sus credenciales.')
      // UX: Limpiar mensaje de error tras 3 segundos
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y Título */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-xl bg-primary-600 text-white mb-4">
            <Package className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            BrandStock
          </h1>
          <p className="mt-2 text-gray-600">
            Sistema de Gestión de Inventario
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-100">
          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="label-field">
                Email corporativo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="usuario@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="label-field">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-field pr-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Cargando...' : 'Ingresar'}
            </button>

            {/* Link Olvidaste contraseña */}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/forgot-password')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </form>
        </div>

        {/* Nota informativa */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Usuarios creados por el administrador del sistema.
          </p>
          <p className="text-sm text-gray-500">
            Si no tienes acceso, contacta al área de IT.
          </p>
        </div>

        {/* Nota técnica (solo desarrollo) */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-700">
            <span className="font-semibold">→ Nota de wireframe:</span> Validación de credenciales conecta con backend (Express.js + SQL Server). En este wireframe, cualquier email/contraseña redirige al dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
