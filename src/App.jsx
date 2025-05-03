import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from './routes/RoutesIndex'
import { AuthProvider } from '@/Context/AuthContext'

function App () {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <RoutesIndex />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
