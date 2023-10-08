import { Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Login, Carrito, Signup } from '@/Pages'
import { useAuthContext } from '@/Hooks/useAuthContext'

const RoutesIndex = () => {
  const { isAuth } = useAuthContext()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/dashboard'
        element={
        isAuth ? <Dashboard /> : <Login />
}
      />
      <Route path='/login' element={<Login />} />
      <Route
        path='/carrito'
        element={
        isAuth ? <Carrito /> : <Login />
}
      />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}
export default RoutesIndex
