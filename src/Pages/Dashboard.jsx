import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getMeUserService } from '@/services/userServices'
import Footer from '@/Components/Footer/Footer'
import Header from '@/Components/Header/Header'
import Cart from '@/Components/Card/Cart'
import LoadingSpinner from '@/Components/Loaging/LoadingSpinner' // Asume que tienes este componente

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    // Redirigir si no hay token
    if (!token) {
      Navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Recuperar datos del usuario
        const userResponse = await getMeUserService(token)
        if (userResponse.status === 200) {
          setUserData(userResponse.data)
        }
        
        // Recuperar items del carrito
        const savedCount = localStorage.getItem("contador") || 0
        setCount(parseInt(savedCount))
        
        const loadedCartItems = []
        for (let i = 1; i <= savedCount; i++) {
          const item = localStorage.getItem(`Producto${i}`)
          if (item) {
            loadedCartItems.push(JSON.parse(item))
          }
        }
        setCartItems(loadedCartItems)
        
      } catch (error) {
        console.error('Error en Dashboard:', error)
        setError('Error al cargar los datos del usuario')
        // Si el token es inválido, limpiar y redirigir
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          Navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [Navigate])

  const removeFromCart = (index) => {
    const newItems = [...cartItems]
    newItems.splice(index, 1)
    setCartItems(newItems)
    setCount(count - 1)
    
    // Actualizar localStorage
    localStorage.setItem("contador", count - 1)
    for (let i = 0; i < newItems.length; i++) {
      localStorage.setItem(`Producto${i+1}`, JSON.stringify(newItems[i]))
    }
    localStorage.removeItem(`Producto${newItems.length+1}`)
  }

  const vaciarLocal = () => {
    localStorage.clear()
    setCartItems([])
    setCount(0)
  }

  // Mostrar spinner mientras carga
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    )
  }

  // Mostrar error si ocurrió
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Mostrar contenido principal
  return (
    <>
      <Header 
        count={count} 
        toggleCart={() => setShowCart(!showCart)}
        vaciarLocal={vaciarLocal}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Información del Usuario
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          
          <div className="relative px-6 pb-8">
            <div className="flex justify-center">
              <img 
                src="avatar.webp" 
                alt="User profile" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16 object-cover"
              />
            </div>
            
            <div className="text-center mt-4">
              {userData?.first_name && (
                <h2 className="text-2xl font-bold text-gray-800">
                  {userData.first_name} {userData.last_name}
                </h2>
              )}
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">Género</p>
                  {userData?.gender && (
                    <p className="text-lg font-semibold text-gray-800">
                      {userData.gender === 'M' ? 'Masculino' : 'Femenino'}
                    </p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  {userData?.email && (
                    <p className="text-lg font-semibold text-gray-800 break-all">
                      {userData.email}
                    </p>
                  )}
                </div>
                
                {userData?.phone && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 mb-1">Teléfono</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {userData.phone}
                    </p>
                  </div>
                )}
                
                {userData?.role && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 mb-1">Rol</p>
                    <p className="text-lg font-semibold text-gray-800 capitalize">
                      {userData.role}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cart 
        showCart={showCart} 
        toggleCart={() => setShowCart(!showCart)} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        count={count} 
      />

      <Footer/>
    </>
  )
}