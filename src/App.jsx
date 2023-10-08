import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import RoutesIndex from './routes/RoutesIndex'
import { AuthProvider } from '@/Context/AuthContext'

function App () {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Footer />
          <RoutesIndex />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
