import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Package, Mail, Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPassword() {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[448px] w-full space-y-12">
          {/* Logo y Título */}
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 flex items-center justify-center text-[#1E2939]">
              <Package className="h-16 w-16" />
            </div>
            <h1 className="text-[30px] font-semibold text-[#101828] tracking-tight">BrandStock</h1>
          </div>

          <div className="bg-white p-8 border border-[#D1D5DC] rounded-[10px] space-y-6 text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-[20px] font-semibold text-[#101828]">¡Correo enviado!</h2>
            <p className="text-sm text-[#4A5565]">
              Si el email <strong>{email}</strong> existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
            </p>
            <p className="text-xs text-[#6A7282]">
              Revisa tu bandeja de entrada y spam. El enlace expirará en 24 horas.
            </p>
            
            <div className="pt-6">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[448px] w-full space-y-12">
        {/* Logo y Título */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 flex items-center justify-center text-[#1E2939]">
            <Package className="h-16 w-16" />
          </div>
          <h1 className="text-[30px] font-semibold text-[#101828] tracking-tight">BrandStock</h1>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white p-8 border border-[#D1D5DC] rounded-[10px] space-y-6">
          {/* Botón Volver */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A] hover:text-[#155DFC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al login
          </Link>

          <div className="space-y-2">
            <h2 className="text-[20px] font-semibold text-[#101828] leading-tight">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-sm text-[#4A5565] leading-relaxed">
              Ingresa tu email corporativo y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="label-field">
                Email corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#99A1AF]" />
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
                <p className="mt-1 text-xs text-red-600">{error}</p>
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
          <div className="pt-6 border-t border-[#E5E7EB]">
            <p className="text-xs text-center text-[#6A7282]">
              ¿No tienes acceso? Contacta al área de IT para obtener tus credenciales.
            </p>
          </div>
        </div>

        {/* Nota técnica */}
        <div className="bg-[#F3F4F6] border border-[#D1D5DC] rounded p-3">
          <p className="text-[12px] text-[#4A5565] font-bold">
            → Flujo de seguridad: <span className="font-normal">Sistema valida email en backend y envía token temporal vía SMTP. No se revela si el email existe para prevenir la enumeración de usuarios.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
