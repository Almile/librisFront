import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </StrictMode>
)