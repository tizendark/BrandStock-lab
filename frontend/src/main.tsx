import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './pages/App/App'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
)
