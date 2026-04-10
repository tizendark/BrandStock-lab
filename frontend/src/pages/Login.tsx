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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[448px] w-full space-y-12">
        {/* Logo y Título */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 flex items-center justify-center text-[#1E2939]">
            <Package className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <h1 className="text-[30px] font-semibold text-[#101828] tracking-tight">
              BrandStock
            </h1>
            <p className="text-sm text-[#4A5565]">
              Sistema de Gestión de Inventario
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white p-8 border border-[#D1D5DC] rounded-[10px] space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div className="space-y-2">
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
            <div className="space-y-2">
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
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-[#717182] hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4">
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
                className="btn-secondary text-sm"
                onClick={() => navigate('/forgot-password')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>

          {/* Separador y Notas de usuario */}
          <div className="pt-6 border-t border-[#E5E7EB] text-center space-y-1">
            <p className="text-xs text-[#6A7282]">
              Usuarios creados por el administrador del sistema.
            </p>
            <p className="text-xs text-[#6A7282]">
              Si no tienes acceso, contacta al área de IT.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
