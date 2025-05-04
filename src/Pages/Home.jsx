import { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star, Menu, X } from 'lucide-react'
import { getAllItemsService } from '@/services/itemServices'
import Header from '@/Components/Header/Header'
import Cart from '@/Components/Card/Cart'
import Footer from '@/Components/Footer/Footer'
import AddedToCartModal from '@/Components/Card/AddedToCartModal'
import AuthModal from '@/Components/Card/AuthModal'

export default function Home() {
  const [itemsList, setItemList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('todo')
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await getAllItemsService()
        if (response.status === 200) {
          setItemList(response.data)
          setLoading(false)
        }
      } catch (error) {
        console.log('Ocurrió un error en Home', error)
      }
    }
    fetchItemsData()

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

    setIsAuthenticated(!!token)
  }, [token])

  const handleSearch = async (e) => {
    const value = e.target.value
    setSearch(value)
    
    try {
      const response = await getAllItemsService()
      if (response.status === 200) {
        if (!value) {
          setItemList(response.data)
        } else {
          const filterProducts = response.data.filter((product) => 
            product.product_name.toLowerCase().includes(value.toLowerCase())
          )
          setItemList(filterProducts)
        }
      }
    } catch (error) {
      console.log('Error al buscar productos', error)
    }
  }

  const addToCart = (product) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    const newCount = count + 1
    setCount(newCount)
    localStorage.setItem("contador", newCount)
    localStorage.setItem(`Producto${newCount}`, JSON.stringify(product))
    setCartItems([...cartItems, product])
    setSelectedProduct(product)
    setShowModal(true)
  }

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

  const filteredItems = activeTab === 'todo' 
    ? itemsList 
    : itemsList.filter(product => {
        if (activeTab === 'toys') return product.category === 'Toys'
        if (activeTab === 'games') return product.category === 'Grocery'
        if (activeTab === 'salud') return product.category === 'Health'
        return false
      })

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'todo', name: 'Todos los productos' },
    { id: 'toys', name: 'Juguetes' },
    { id: 'games', name: 'Alimentos' },
    { id: 'salud', name: 'Salud' }
  ]

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header 
        count={count} 
        toggleCart={() => setShowCart(!showCart)} 
      />

      <main className="flex-grow pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search Section */}
        <div className="mb-4 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Tabs - Desktop */}
        <div className="hidden sm:block mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-4 md:space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap py-2 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tabs - Mobile */}
        <div className="sm:hidden mb-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <span className="text-sm font-medium text-gray-900">
              {tabs.find(tab => tab.id === activeTab)?.name || 'Categorías'}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-white rounded-md p-2 flex items-center justify-center text-gray-400"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {mobileMenuOpen && (
            <div className="mt-2 py-2 bg-white shadow-lg rounded-md border border-gray-200 absolute z-10 left-4 right-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    block w-full text-left px-4 py-2 text-sm
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-50'}
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-36 sm:h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.product_name} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  4.5
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-1">{product.product_name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto h-8 sm:h-12 w-8 sm:w-12 text-gray-400">
              <Search className="h-8 sm:h-12 w-8 sm:w-12" />
            </div>
            <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">No se encontraron productos</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Intenta con otra búsqueda o categoría.
            </p>
          </div>
        )}
      </main>

      <Cart 
        showCart={showCart} 
        toggleCart={() => setShowCart(!showCart)} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        count={count} 
      />

      <AddedToCartModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        selectedProduct={selectedProduct} 
        setShowCart={setShowCart} 
      />

      <AuthModal 
        show={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={() => navigate('/login')} 
      />

      <Footer />
    </div>
  )
}