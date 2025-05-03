import React from 'react'
import { useAuthContext } from '@/Hooks/useAuthContext'
import { ShoppingCart } from 'lucide-react'

const Header = ({ count, toggleCart, vaciarLocal }) => {
  const { logout, isAuth } = useAuthContext()

  const linkIsActive = (isActive) => {
    return isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Mi Tienda Online</h1>

          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
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
      </div>
    </header>
  )
}

export default Header