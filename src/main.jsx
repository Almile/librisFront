import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './styles/index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.jsx'

const CLIENT_ID = "526714068193-mu9g6l4jqnb0apcc6c06b9j3dd9lcq42.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <AuthProvider>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </AuthProvider>
  </StrictMode>

)