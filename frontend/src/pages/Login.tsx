import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Package } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implementar validación real con backend Express.js + SQL Server
    // Por ahora, cualquier email/contraseña redirige al dashboard (según wireframe)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/')
    }, 1000)
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
