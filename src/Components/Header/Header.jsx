import React, { useState } from 'react'
import { useAuthContext } from '@/Hooks/useAuthContext'
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function Header ({ count, toggleCart, vaciarLocal }) {
  const { logout, isAuth } = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkIsActive = (isActive) => {
    return isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mi Tienda Online</h1>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuth && (
              <button
                onClick={toggleCart}
                className="relative mr-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center"
              >
                <ShoppingCart size={18} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {count}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-4 items-center">
              <a href="/" className={linkIsActive(window.location.pathname === '/')}>Home</a>
              <a href="/dashboard" className={linkIsActive(window.location.pathname === '/dashboard')}>Mi cuenta</a>

              {isAuth ? (
                <>
                  <button
                    onClick={toggleCart}
                    className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    <span>Carrito</span>
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {count}
                      </span>
                    )}
                  </button>
                  <button
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    onClick={() => {
                      logout()
                      vaciarLocal()
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className={linkIsActive(window.location.pathname === '/login')}>Login</a>
                  <a href="/signup" className={linkIsActive(window.location.pathname === '/signup')}>Signup</a>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a 
                href="/" 
                className={`${linkIsActive(window.location.pathname === '/')} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/dashboard" 
                className={`${linkIsActive(window.location.pathname === '/dashboard')} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mi cuenta
              </a>
              
              {isAuth ? (
                <>
                  <a 
                    href="#" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCart()
                      setIsMenuOpen(false)
                    }}
                  >
                    Ver Carrito
                  </a>
                  <a 
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-red-600"
                    onClick={(e) => {
                      e.preventDefault()
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    Cerrar Sesión
                  </a>
                </>
              ) : (
                <>
                  <a 
                    href="/login" 
                    className={`${linkIsActive(window.location.pathname === '/login')} block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a 
                    href="/signup" 
                    className={`${linkIsActive(window.location.pathname === '/signup')} block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}