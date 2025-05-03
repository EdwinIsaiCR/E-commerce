import { X, ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'

export default function Cart({ 
  showCart, 
  toggleCart, 
  cartItems, 
  removeFromCart, 
  count 
}) {
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)
  }

  // Bloquear el scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showCart])

  // Prevenir el cierre accidental al hacer clic dentro del carrito
  const handleCartClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      {/* Fondo oscuro semi-transparente */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          showCart ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />
      
      {/* Carrito */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md z-50 transform transition-transform duration-300 ease-in-out ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={handleCartClick}
      >
        <div className="h-full flex flex-col bg-white shadow-xl">
          <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900">Carrito de compras</h2>
              <button 
                onClick={toggleCart}
                className="ml-3 h-7 flex items-center"
              >
                <X className="h-6 w-6 text-gray-400 hover:text-gray-500" />
              </button>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                {count > 0 ? (
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <li key={`${item.id}-${index}`} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1">{item.product_name}</h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.category}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Cantidad: 1</p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(index)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Agrega productos a tu carrito para continuar con la compra.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {count > 0 && (
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${getTotal()}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
              <div className="mt-6">
                <button className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Finalizar compra
                </button>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  o{' '}
                  <button
                    type="button"
                    className="text-blue-600 font-medium hover:text-blue-500"
                    onClick={toggleCart}
                  >
                    Continuar comprando<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}