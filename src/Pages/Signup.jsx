import { useForm } from 'react-hook-form'
import { registerUserService } from '@/services/userServices'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import Header from '../Components/Header/Header'

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await registerUserService(data)
      if (response.status === 201) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        console.log('Usuario creado exitosamente')
      }
    } catch (error) {
      console.log('Ocurrio un error en Signup', error)
      setError(error.response?.data?.message || 'Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header />
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Content - Form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center">
            <img src="carrito.webp" alt="Logo" className="h-12 w-auto" />
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </Link>
          </p>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* First Name */}
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      id="first_name"
                      type="text"
                      autoComplete="given-name"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.first_name ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      {...register('first_name', { 
                        required: 'Nombre es requerido',
                        minLength: {
                          value: 2,
                          message: 'El nombre debe tener al menos 2 caracteres'
                        }
                      })}
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <div className="mt-1">
                    <input
                      id="last_name"
                      type="text"
                      autoComplete="family-name"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.last_name ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      {...register('last_name', { 
                        required: 'Apellido es requerido',
                        minLength: {
                          value: 2,
                          message: 'El apellido debe tener al menos 2 caracteres'
                        }
                      })}
                    />
                    {errors.last_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Género
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.gender ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      {...register('gender', { 
                        required: 'Género es requerido'
                      })}
                    >
                      <option value="">Selecciona...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
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
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
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
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    La contraseña debe tener al menos 6 caracteres
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error al crear la cuenta
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          ¡Registro exitoso!
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Tu cuenta ha sido creada. Serás redirigido al inicio de sesión.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading || success}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      (isLoading || success) ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </button>
                </div>
                
                {/* Terms and Conditions */}
                <div className="text-xs text-gray-500 mt-3">
                  Al registrarte, aceptas nuestros{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Términos y Condiciones
                  </a>{' '}
                  y{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Política de Privacidad
                  </a>.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side Image/Banner - Hidden on small screens */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
          <div className="max-w-md mx-auto p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Únete a nuestra comunidad</h2>
            <p className="text-lg">Crea una cuenta para obtener acceso a ofertas exclusivas, seguimiento de pedidos y una experiencia personalizada.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
