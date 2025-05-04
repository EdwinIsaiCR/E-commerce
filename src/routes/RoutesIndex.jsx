import { Routes, Route, Navigate } from 'react-router-dom'
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
          isAuth ? <Dashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/signup"
        element={isAuth ? <Navigate to="/dashboard" /> : <Signup />}
      />
    </Routes>
  )
}
export default RoutesIndex
