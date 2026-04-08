import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Package, Mail, Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido')
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implementar llamada real al backend Express.js
      // POST /api/auth/forgot-password
      // Por ahora simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
    } catch (err) {
      setError('Ocurrió un error. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  // Vista de éxito después de enviar
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¡Correo enviado!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Si el email <strong>{email}</strong> existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Revisa tu bandeja de entrada y spam. El enlace expirará en 24 horas.
            </p>
          </div>
          
          <div className="mt-6">
            <Link
              to="/login"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y Título */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-xl bg-primary-600 text-white mb-4">
            <Package className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">BrandStock</h1>
        </div>

        {/* Botón Volver */}
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al login
          </Link>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-sm text-gray-600">
              Ingresa tu email corporativo y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="label-field">
                Email corporativo
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="usuario@empresa.com"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar enlace de recuperación'
              )}
            </button>
          </form>

          {/* Nota de ayuda */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              ¿No tienes acceso? Contacta al área de IT para obtener tus credenciales.
            </p>
          </div>
        </div>

        {/* Nota técnica */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-xs text-blue-700">
            <strong>→ Flujo de seguridad:</strong> El sistema valida el email en el backend y envía un token temporal vía SMTP. No se revela si el email existe para prevenir la enumeración de usuarios.
          </p>
        </div>
      </div>
    </div>
  )
}
