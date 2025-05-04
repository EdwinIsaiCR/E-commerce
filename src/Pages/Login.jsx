import { useForm } from 'react-hook-form'
import { loginUserService } from '@/services/userServices'
import { useAuthContext } from '@/Hooks/useAuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import Header from '../Components/Header/Header'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuthContext()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(false)
    try {
      const response = await loginUserService(data)
      if (response.status === 200) {
        login(response.data.token)
        navigate('/')
        console.log('Usuario autenticado exitosamente')
      }
    } catch (error) {
      console.log('Ocurrio un error en Login', error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header />
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center">
            <img src="carrito.webp" alt="Logo" className="h-12 w-auto" />
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Regístrate aquí
            </Link>
          </p>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@ejemplo.com"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      {...register('email', { 
                        required: 'Email es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      {...register('password', { 
                        required: 'Contraseña es requerida',
                        minLength: {
                          value: 6,
                          message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                      })}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error al iniciar sesión
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            Por favor verifica tu correo y contraseña e intenta nuevamente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Side Image/Banner - Hidden on small screens */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
          <div className="max-w-md mx-auto p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Bienvenido a Mi Tienda Online</h2>
            <p className="text-lg">Accede a tu cuenta para descubrir nuestros productos exclusivos y disfrutar de una experiencia de compra personalizada.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}