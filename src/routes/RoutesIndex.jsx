import { Routes, Route } from 'react-router-dom'
import Home from '@/Pages/Home'
import Dashboard from '@/Pages/Dashboard'
import Login from '@/Pages/Login'
import Signup from '@/Pages/Signup'
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
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}
export default RoutesIndex
