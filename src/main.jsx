import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthcontextProvider } from './context/UserAuth.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>
    <App />
    </AuthcontextProvider>
 
  </React.StrictMode>,
)
